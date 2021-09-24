import requests
from django.http.response import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from .models import GeoInfo
import json
from .NER import NER
import re
# Create your views here.

import time


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
        if '상하이' in entity:
            print(f"before 상하이 : {entity}")
            print(f"before LEN(상하이) : {len(entity)}")
            print(f"{entity[0], entity[-1]}")
            print(f"{ord(entity[0])}, {ord(entity[-1])}")
        # tmp = re.sub('[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', '', entity)
        tmp = re.sub('[^가-힣0-9a-zA-Z]', '', entity)
        if tmp:
            ret.append(tmp)
    ret = list(set(ret))
    for tmp in ret:
        if '상하이' in tmp:
            print(f"after 상하이 : {tmp}")
            print(f"after LEN(상하이) : {len(tmp)}")
            print(f"{tmp[0], tmp[-1]}")
            print(f"{ord(tmp[0])}, {ord(tmp[-1])}")

    return ret


def getLatLng(address):
    result = ""

    url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + address
    rest_api_key = '83e91879c197aec3b36cb5688f51dc16'
    header = {'Authorization': 'KakaoAK ' + rest_api_key}

    r = requests.get(url, headers=header)

    try:
        if r.status_code == 200:
            result_address = r.json()["documents"][0]["address"]

            result = result_address["y"], result_address["x"]
        else:
            result = "ERROR[" + str(r.status_code) + "]"
    except:
        result = "ERROR[" + str(r.status_code) + "]"

    return result


def getKakaoMapHtml(address_latlng):
    javascript_key = "3d078ce22dcc65c61c7dc5eab06112da"

    result = ""
    result = result + \
        "<div id='map' style='width:300px;height:200px;display:inline-block;'></div>" + "\n"
    result = result + "<script type='text/javascript' src='//dapi.kakao.com/v2/maps/sdk.js?appkey=3d078ce22dcc65c61c7dc5eab06112da" + \
        javascript_key + "'></script>" + "\n"
    result = result + "<script>" + "\n"
    result = result + \
        "    var container = document.getElementById('map'); " + "\n"
    result = result + "    var options = {" + "\n"
    result = result + \
        "           center: new kakao.maps.LatLng(" + \
        address_latlng[0] + ", " + address_latlng[1] + ")," + "\n"
    result = result + "           level: 3" + "\n"
    result = result + "    }; " + "\n"
    result = result + \
        "    var map = new kakao.maps.Map(container, options); " + "\n"

    # 검색한 좌표의 마커 생성을 위해 추가
    result = result + \
        "    var markerPosition  = new kakao.maps.LatLng(" + \
        address_latlng[0] + ", " + address_latlng[1] + ");  " + "\n"
    result = result + \
        "    var marker = new kakao.maps.Marker({position: markerPosition}); " + "\n"
    result = result + "    marker.setMap(map); " + "\n"

    result = result + "</script>" + "\n"

    return result


@csrf_exempt
def home(request):
    address = "서울 강남구 선릉로 669"

    # 카카오 REST API로 좌표 구하기
    address_latlng = getLatLng(address)
    print("[address_latlng]:    ", address_latlng)
    # # geoInfo = GeoInfo()
    # # geoInfo.latitude =

    # # 좌표로 지도 첨부 HTML 생성
    # if str(address_latlng).find("ERROR") < 0:
    #     map_html = getKakaoMapHtml(address_latlng)

    #     print(map_html)
    # else:
    #     print("[ERROR]getLatLng")
    return render(request, 'example.html', {'lat': address_latlng[0], 'lon': address_latlng[1]})


@csrf_exempt
def infos(request):
    if request.method == 'GET':
        Data = request.GET.get('sourceText')
        key = request.GET.get('key')
        if key:
            print(key)
            if key == 'highlight':
                print("getted highlight Data : ", Data)
                return JsonResponse({'foo': 'bar'})

        address_latlng = getLatLng(Data)
        print("[address_latlng]:    ", address_latlng)
        if str(address_latlng).find("ERROR") < 0 and key == 'showmap':
            # return HttpResponseRedirect('https://dapi.kakao.com/v2/maps/sdk.js?appkey=3d078ce22dcc65c61c7dc5eab06112da')
            return render(request, 'example.html', {'lat': address_latlng[0], 'lon': address_latlng[1]})
            # return render(request, 'example3.html', {'draggedText': Data})
        else:
            print("[ERROR]getLatLng")
            return render(request, 'example2.html')
    elif request.method == 'POST':
        body = json.loads(request.body.decode('utf-8'))
        print("IN views.py, START infos")
        print(f"body : {body}")

        start_NER = True

        if start_NER:
            entire_start_time = time.time()
            preprocessing_start_time = time.time()
            print("START PREPROCESSING")
            src_text = preprocessing_src_text(body["sourceText"])
            print(
                f"PREPROCESSING EXE time : {time.time()-preprocessing_start_time}")
            if not src_text:
                print("Empty text")
                ret = []
                return JsonResponse({'NER_result': 'None'})
            else:
                ner_start_time = time.time()
                print("START NER")
                print(
                    f"TYPE : {type(src_text)}, len(src_text) : {len(src_text)}")
                print(f"src_text[:10] : {src_text[:10]}")
                # with open('test.txt', 'a') as f:
                #     for string in src_text:
                #         f.write(string)
                #         f.write("\n\n")
                raw_ret = NER(src_text)
                print(f"RAW_NER : {raw_ret}")
                print(f"len(RAW_NER) : {len(raw_ret)}")
                print(f"NER EXE time : {time.time() - ner_start_time}")

                postprocessing_start_time = time.time()
                ret = postprocessing_ner_result(raw_ret)
                print(f"REAL_NER : {ret}")
                print(f"len(REAL_NER) : {len(ret)}")
                print(
                    f"POSTPROCESSING EXE time : {time.time()-postprocessing_start_time}")

                print(f"ENTIRE EXE time : {time.time()-entire_start_time}")
                return JsonResponse({'NER_result': ret})
        else:
            return JsonResponse({'NER_result': 'None'})
