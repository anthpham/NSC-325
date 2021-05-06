import nmap
import nmap3
import json
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-d', action='store_true')
options = parser.parse_args()

def log(s):
    if options.d:
        print(s)

print("Loading 10%")

nm = nmap.PortScanner()
nmap = nmap3.Nmap()

print("Loading 20%")

# Find all active ip addresses
ip_dict = {}
ip_addies = []

nmap_out = nm.scan('192.168.0.*')
print("Loading 30%")
for key, value in nmap_out['scan'].items():
    log("Key: ")
    log(key)
    log("Val: ")
    log(value)
    if key.startswith('192.168.0.'):
        log(key)
        log(value)
        ip_dict['ip'] = value
        ip_addies.append(key)

print("Loading 50%")

log(ip_addies)
#NOTES: Let's change the overall table to key (mac address) : list (ip, product, ostype)

device_dict = {}
for ip in ip_addies:
    results = nmap.nmap_version_detection(ip)
    log("results are /n")
    log(results)
    mac = results[ip]['macaddress']
    log("mac address is /n")
    log(mac)
    # ip_addies = []
    stats = []
    try:
        stats.append(results[ip]['ports'][0]['service']['name'])
    except:
        #if # what attributes does this error have and can we operate based on this knowledge?
        #stats.append(results[ip]['ports'][1]['service']['name'])
        log("ERROR 1")
        stats.append('')
    try:
        stats.append(results[ip]['ports'][0]['service']['product'])
    except:
        #stats.append(results[ip]['ports'][1]['service']['product'])
        log("ERROR 2")
        stats.append('')
    try:
        stats.append(results[ip]['ports'][1]['service']['ostype'])
    except:
        log("ERROR 3")
        stats.append('')
    try:
        stats.append(results[ip]['ports'][1]['cpe'][0]['cpe'])
    except:
        #stats.append(results[ip]['ports'][2]['cpe'][0]['cpe'])
        log("ERROR 4")
        stats.append('')
    try:
        stats.append(results[ip]['macaddress']['vendor'])
    except:
        log("ERROR 5")
        stats.append('')
    try:
        device_dict[mac['addr']] = stats
    except:
        log("ERROR 6")
        device_dict['no mac, ip is {}'.format(ip)] = stats
print(device_dict)
print("Loading 90%")

json = json.dumps(device_dict)
f = open("data/devices.json","w")
f.write(json)
print("Loading 100%")
f.close()