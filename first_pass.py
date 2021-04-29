import nmap
import nmap3
import pandas as pd
import json



nm = nmap.PortScanner()
nmap = nmap3.Nmap()

# Find all active ip addresses
ip_dict = {}
ip_addies = []

nmap_out = nm.scan('192.168.0.*')
for key, value in nmap_out['scan'].items():
    if key.startswith('192.168.0.'):
        print(key)
        print(value)
        ip_dict['ip'] = value
        ip_addies.append(key)

print(ip_addies)
#NOTES: Let's change the overall table to key (mac address) : list (ip, product, ostype)

device_dict = {}
for ip in ip_addies:
    results = nmap.nmap_version_detection(ip)
    print("results are /n")
    print(results)
    mac = results[ip]['macaddress']
    print("mac address is /n")
    print(mac)
    stats = []
    try:
        stats.append(results[ip]['ports'][0]['service']['name'])
    except IndexError as e:
        #if # what attributes does this error have and can we operate based on this knowledge?
        #stats.append(results[ip]['ports'][1]['service']['name'])
        stats.append('')
    try:
        stats.append(results[ip]['ports'][0]['service']['product'])
    except:
        #stats.append(results[ip]['ports'][1]['service']['product'])
        stats.append('')
    try:
        stats.append(results[ip]['ports'][1]['service']['ostype'])
    except:
        stats.append('')
    try:
        stats.append(results[ip]['ports'][1]['cpe'][0]['cpe'])
    except:
        #stats.append(results[ip]['ports'][2]['cpe'][0]['cpe'])
        stats.append('')
    try:
        stats.append(results[ip]['macaddress']['vendor'])
    except:
        stats.append('')
    try:
        device_dict[mac['addr']] = stats
    except:
        device_dict['no mac, ip is {}'.format(ip)] = stats
print(device_dict)

json = json.dumps(device_dict)
f = open("outDict.json","w")
f.write(json)
f.close()