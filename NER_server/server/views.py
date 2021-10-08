import requests
from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
from .NER import NER
import re
import time
import os


secret = os.environ.get("kakao_rest_api_key")


def preprocessing_src_text(src_text):
    strings = [string.strip()
               for string in src_text.split('\n') if string.strip()]
    if not strings:
        return []

    LEN_STD_STR = 100
    ret = []
    for string in strings:
        if len(string) >= 128:
            if '?' in string:
                tmp = [string.strip()
                       for string in string.split('?') if string.strip()]
            elif '!' in string:
                tmp = [string.strip()
                       for string in string.split('!') if string.strip()]
            elif '.' in string:
                tmp = [string.strip()
                       for string in string.split('.') if string.strip()]
            else:  # 그냥 일정 크기로 나누는 것
                tmp = [string[i:i+LEN_STD_STR]
                       for i in range(0, len(string), LEN_STD_STR)]
            ret = ret + tmp
        else:
            ret.append(string)
    return ret


def postprocessing_ner_result(entities):  # entities : set()
    if not entities:
        return []

    ret = []
    for entity in entities:
        entity = entity.strip()
        tmp = re.sub('[^가-힣0-9a-zA-Z]', '', entity)
        if tmp:
            ret.append(tmp)
    ret = list(set(ret))

    return ret


def getLatLng(address):
    result = ""

    url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
    # rest_api_key = '83e91879c197aec3b36cb5688f51dc16'
    rest_api_key = secret
    header = {'Authorization': 'KakaoAK ' + rest_api_key}

    r = requests.get(url, headers=header)
    try:
        if r.status_code == 200:
            result_address = r.json()["documents"][0]["address"]
            result = result_address["y"], result_address["x"]
        else:
            result = "ERROR[" + str(r.status_code) + "]"
    except:
        url = 'https://dapi.kakao.com/v2/local/search/keyword.json?query=' + address
        r = requests.get(url, headers=header)
        try:
            if r.status_code == 200:
                result_address = r.json()["documents"][0]
                result = result_address["y"], result_address["x"]
            else:
                result = "ERROR[" + str(r.status_code) + "]"
        except:
            result = "ERROR[" + str(r.status_code) + "]"

    return result


def getEntities(y, x, category_group_code, radius):
    result = ""

    url = 'https://dapi.kakao.com/v2/local/search/category.json?category_group_code=' + \
        str(category_group_code) + '&y=' + str(y) + \
        '&x=' + str(x) + "&radius=" + str(radius) + "&sort=distance"

    rest_api_key = secret
    # rest_api_key = '83e91879c197aec3b36cb5688f51dc16'
    header = {'Authorization': 'KakaoAK ' + rest_api_key}

    r = requests.get(url, headers=header)

    try:
        if r.status_code == 200:
            result = r.json()["documents"]
        else:
            result = "ERROR[" + str(r.status_code) + "]"
    except:
        result = "ERROR[" + str(r.status_code) + "]2"

    return result


@csrf_exempt
def infos(request):
    if request.method == 'GET':
        Data = request.GET.get('sourceText')
        category_group_code = request.GET.get('code')

        address_latlng = getLatLng(Data)

        if str(address_latlng).find("ERROR") < 0:
            if not category_group_code:
                return HttpResponseRedirect('https://map.kakao.com/link/to/' + Data + ','+address_latlng[0]+','+address_latlng[1])
            else:
                # radius 20000이 20km 0~20000
                entities = getEntities(
                    address_latlng[0], address_latlng[1], category_group_code, 1000)
                if str(entities).find("ERROR") < 0:
                    return render(request, 'near_entities.html', {'center': Data, 'lat': address_latlng[0], 'lon': address_latlng[1], 'Entities': entities})
                else:
                    return render(request, 'cannot_find_coord.html', {'service': "주변 entity 검색"})
        else:
            # print("[ERROR]getLatLng")
            if category_group_code:
                return render(request, 'cannot_find_coord.html', {'service': "주변 entity 검색"})
            else:
                return render(request, 'cannot_find_coord.html', {'service': "길찾기"})
    elif request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        # print("IN views.py, START infos")
        print(f"body : {body}")

        start_NER = True

        if start_NER:
            entire_start_time = time.time()
            preprocessing_start_time = time.time()
            # print("START PREPROCESSING")
            src_text = preprocessing_src_text(body["sourceText"])
            # print(
            #     f"PREPROCESSING EXE time : {time.time()-preprocessing_start_time}")
            if not src_text:
                # print("Empty text")
                ret = []
                return JsonResponse({'NER_result': 'None'})
            else:
                ner_start_time = time.time()
                # print("START NER")
                # print(
                #     f"TYPE : {type(src_text)}, len(src_text) : {len(src_text)}")
                print(f"src_text[:10] : {src_text[:10]}")

                raw_ret = NER(src_text)
                # print(f"RAW_NER : {raw_ret}")
                # print(f"len(RAW_NER) : {len(raw_ret)}")
                # print(f"NER EXE time : {time.time() - ner_start_time}")

                postprocessing_start_time = time.time()
                ret = postprocessing_ner_result(raw_ret)

                print(f"REAL_NER : {ret}")
                # print(f"len(REAL_NER) : {len(ret)}")
                # print(
                #     f"POSTPROCESSING EXE time : {time.time()-postprocessing_start_time}")

                print(f"ENTIRE EXE time : {time.time()-entire_start_time}")
                return JsonResponse({'NER_result': ret})
        else:
            return JsonResponse({'NER_result': 'None'})
