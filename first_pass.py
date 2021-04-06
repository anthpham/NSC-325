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

#prod_dict = {}
#os_dict = {}
#mac_dict = {}
device_dict = {}
for ip in ip_addies:
    device_dict['ip'] = ip
    results = nmap.nmap_version_detection(ip)
    try:
        prod = results[ip]['ports'][1]['service']['product']
        device_dict['{ip}'.format(ip=ip)] = prod
        os = results[ip]['ports'][1]['service']['ostype']
        os_dict[]
    except:
        pass
