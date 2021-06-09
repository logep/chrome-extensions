11. http://localhost:8085/m.api?\_gp=admin.anyattr&\_mt=getList&id=1&type=2
    11..1 http://localhost:8085/m.api?\_gp=admin.anyattr&\_mt=updateObj&anyAttrDTO={"id":1,"attr1":"66666666","attr2":"555555"} post 请求方式
    11..2 http://localhost:8085/m.api?\_gp=admin.anyattr&\_mt=insertObj&anyAttrDTO={"id":1,"attr1":"66666666","attr2":"555555"}
    11..3 http://localhost:8085/m.api?\_gp=admin.anyattr&\_mt=delById&aid=5f89f82f-d695-4fde-a167-6f73c6cb1a18
    11..4 http://localhost:8085/m.api?\_gp=admin&\_mt=login&username=guest&password=123456&verifyCode=666666 post 请求方式

###

#python 3.8
import time
import hmac
import hashlib
import base64
import urllib.parse

timestamp = 1623196848921
secret = 'SECc08677417e75e189b0f5696ed314d8f6794087c90da53b4eedee086a2166b24a'
secret_enc = secret.encode('utf-8')
print(secret_enc)
string_to_sign = '{}\n{}'.format(timestamp, secret)
string_to_sign_enc = string_to_sign.encode('utf-8')
print(string_to_sign_enc)
print(hmac.new(secret_enc, string_to_sign_enc, digestmod=hashlib.sha256))
hmac_code = hmac.new(secret_enc, string_to_sign_enc, digestmod=hashlib.sha256).digest()
print(hmac_code)
print(base64.b64encode(hmac_code))
sign = urllib.parse.quote_plus(base64.b64encode(hmac_code))
print(timestamp)
print(sign)

<!-- "https://9ping.cn/*" -->

attr16 ='app_token'

fetch('https://9ping.cn/m.api?_gp=admin.anyattr', {
method: 'POST',
mode: 'cors',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({
\_mt:"updateObj",
anyAttrDTO:{"id":1,"attr1":"66666666","attr2":"555555"}
}),
credentials: 'include'
})
