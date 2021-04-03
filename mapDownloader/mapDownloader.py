from urllib.request import Request, urlopen
import math

minLat=43.153
maxLat=43.112
minLon=13.028
maxLon=13.098

def deg2num(lat_deg, lon_deg, zoom):
	lat_rad = math.radians(lat_deg)
	n = 2.0 ** zoom
	xtile = int((lon_deg + 180.0) / 360.0 * n)
	ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
	return (xtile, ytile)

for z in range(15,20):
	minX, minY = deg2num(minLat,minLon,z)
	maxX, maxY = deg2num(maxLat,maxLon,z)
	print("downloading zoom {}".format(z))
	for x in range(minX,maxX):
		for y in range(minY,maxY):
			try:
				url = 'https://a.tile.openstreetmap.org/{}/{}/{}.png'.format(z,x,y)
				req = Request(url)
				req.add_header('Host', 'a.tile.openstreetmap.org')
				req.add_header('User-Agent', 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0')
				req.add_header('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
				req.add_header('Connection', 'keep-alive')
				html = urlopen(req).read()
				with open('tiles/{}_{}_{}.png'.format(z,x,y),'wb') as f:
					f.write(html)
			except Exception as e:
				print(traceback.format_exception(*sys.exc_info()))

