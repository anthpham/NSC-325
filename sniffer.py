import nmap
import nmap3
import json
import os
from parse import *

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
    if key.startswith('192.168.0.'):
        # print(key)
        # print(value)
        ip_dict['ip'] = value
        ip_addies.append(key)

print("Loading 50%")

# print(ip_addies)
#NOTES: Let's change the overall table to key (mac address) : list (ip, product, ostype)

# read in existing device names
with open('data/device-names.json') as f:
    names = json.load(f)

device_dict = {}
for ip in ip_addies:
    print("loop")
    results = nmap.nmap_version_detection(ip)
    print(results)
    # print("results are /n")
    # print(results)
    mac = results[ip]['macaddress']

    # Check if the mac address exists in data/device-names.json. If not, add mac with "unknown"
    try:
        if mac['addr'] in names.keys():
            print('Device with mac address {} is already named'.format(mac['addr']))
        else:
            names[mac['addr']] = 'unknown'
    except:
        pass
    # print("mac address is /n")
    # print(mac)
    stats = {}
    stats['ip'] = ip

    # Read nmap output into a dictionary
    try:
        stats['name'] = results[ip]['ports'][0]['service']['name']
    except IndexError as e:
        stats['name'] = ''
    try:
        stats['product'] = results[ip]['ports'][0]['service']['product']
    except:
        #stats.append(results[ip]['ports'][1]['service']['product'])
        stats['product'] = ''
    try:
        stats['ostype'] = results[ip]['ports'][1]['service']['ostype']
    except:
        stats['ostype'] = ''
    try:
        stats['cpe'] = results[ip]['ports'][1]['cpe'][0]['cpe']
    except:
        #stats.append(results[ip]['ports'][2]['cpe'][0]['cpe'])
        stats['cpe'] = ''
    try:
        stats['vendor'] = results[ip]['macaddress']['vendor']
    except:
        stats['vendor'] = ''
    try:
        device_dict[mac['addr']] = stats
    except:
        device_dict['no mac, ip is {}'.format(ip)] = stats

# print(device_dict)
print("Loading 90%")
# Update arp table
namesJ = json.dumps(names)
j = open("data/device-names.json","r+")
j.write(namesJ)
j.close()

json = json.dumps(device_dict)
f = open("data/device-list.json","r+")
f.write(json)
print("Loading 100%")
f.close()