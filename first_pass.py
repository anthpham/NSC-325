import nmap
import nmap3



nm = nmap.PortScanner()
nmap = nmap3.Nmap()

# Find all active ip addresses
ip_dict = {}
ip_addies = []

nmap_out = nm.scan('192.168.0.*')
for key, value in nmap_out['scan'].items():
    if key.startswith('192.168.0.'):
        ip_dict['{ip}'.format(ip=key)] = value
        ip_addies.append('{ip}'.format(ip=key))


#NOTES: Let's change the overall table to key (mac address) : list (ip, product, ostype)

device_dict = {}
for ip in ip_addies:
    results = nmap.nmap_version_detection(ip)
    try:
        mac = results[ip]['macaddress']
        stats = []
        stats.append(results[ip]['ports'][1]['service']['name'])
        stats.append(results[ip]['ports'][1]['service']['product'])
        stats.append(results[ip]['ports'][1]['service']['ostype'])
        stats.append(results[ip]['ports'][1]['cpe'][0]['cpe'])
        device_dict[mac] = stats
        print(device_dict)
    except:
        pass
