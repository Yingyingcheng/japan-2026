/* Representative points for every place on the map. Most are public address geocodes from the
   Geospatial Information Authority of Japan (GSI); places without a street address use the
   OpenStreetMap position named in `source`. These are not entrance-level navigation points. */
window.TRIP_MAP_POINTS = {
  "aoyama": {
    "lat": 35.66872,
    "lon": 139.717163,
    "query": "東京都港区南青山2-27-18",
    "matched": "東京都港区南青山二丁目２７番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B12-27-18"
  },
  "afuri": {
    "lat": 35.663567,
    "lon": 139.711945,
    "query": "東京都港区南青山5-6-4",
    "matched": "東京都港区南青山五丁目６番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B15-6-4"
  },
  "love-table": {
    "lat": 35.666824,
    "lon": 139.71109,
    "query": "東京都渋谷区神宮前4-3-2",
    "matched": "東京都渋谷区神宮前四丁目３番２号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%A5%9E%E5%AE%AE%E5%89%8D4-3-2"
  },
  "ginkgo": {
    "lat": 35.673153,
    "lon": 139.719757,
    "query": "東京都港区北青山2-1",
    "matched": "東京都港区北青山二丁目１番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8C%97%E9%9D%92%E5%B1%B12-1"
  },
  "human-tokyo": {
    "lat": 35.665989,
    "lon": 139.7034,
    "query": "東京都渋谷区神宮前6-25-10",
    "matched": "東京都渋谷区神宮前六丁目２５番１０号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%A5%9E%E5%AE%AE%E5%89%8D6-25-10"
  },
  "fuglen-tokyo": {
    "lat": 35.666702,
    "lon": 139.692444,
    "query": "東京都渋谷区富ヶ谷1-16-11",
    "matched": "東京都渋谷区富ケ谷一丁目１６番１１号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E5%AF%8C%E3%83%B6%E8%B0%B71-16-11"
  },
  "yoroniku": {
    "lat": 35.660114,
    "lon": 139.717804,
    "query": "東京都港区南青山6-6-22",
    "matched": "東京都港区南青山六丁目６番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B16-6-22"
  },
  "hm-cafe": {
    "lat": 35.672497,
    "lon": 139.712234,
    "query": "東京都渋谷区神宮前2-6-6",
    "matched": "東京都渋谷区神宮前二丁目６番６号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%A5%9E%E5%AE%AE%E5%89%8D2-6-6"
  },
  "gyoen": {
    "lat": 35.688934,
    "lon": 139.705597,
    "query": "東京都新宿区内藤町11",
    "matched": "東京都新宿区内藤町１１番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E5%86%85%E8%97%A4%E7%94%BA11"
  },
  "tanbo": {
    "lat": 35.682388,
    "lon": 139.699783,
    "query": "東京都渋谷区代々木1-41-9",
    "matched": "東京都渋谷区代々木一丁目４１番９号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E4%BB%A3%E3%80%85%E6%9C%A81-41-9"
  },
  "shinjuku-cat": {
    "lat": 35.692688,
    "lon": 139.700851,
    "query": "東京都新宿区新宿3-23-18",
    "matched": "東京都新宿区新宿三丁目２３番１８号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF3-23-18"
  },
  "gelato-pique": {
    "lat": 35.691784,
    "lon": 139.700775,
    "query": "東京都新宿区新宿3-38-1",
    "matched": "東京都新宿区新宿三丁目３８番１号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF3-38-1"
  },
  "nezu": {
    "lat": 35.661983,
    "lon": 139.717346,
    "query": "東京都港区南青山6-5-1",
    "matched": "東京都港区南青山六丁目５番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B16-5-1"
  },
  "gentle-monster": {
    "lat": 35.66317,
    "lon": 139.715271,
    "query": "東京都港区南青山5-3-2",
    "matched": "東京都港区南青山五丁目３番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B15-3-2"
  },
  "ippodo-aoyama": {
    "lat": 35.662777,
    "lon": 139.717621,
    "query": "東京都港区南青山4-23-6",
    "matched": "東京都港区南青山四丁目２３番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%8D%97%E9%9D%92%E5%B1%B14-23-6"
  },
  "mameya": {
    "lat": 35.668369,
    "lon": 139.710922,
    "query": "東京都渋谷区神宮前4-15-3",
    "matched": "東京都渋谷区神宮前四丁目１５番３号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%A5%9E%E5%AE%AE%E5%89%8D4-15-3"
  },
  "roppongi-hills": {
    "lat": 35.659775,
    "lon": 139.731094,
    "query": "東京都港区六本木6-9-1",
    "matched": "東京都港区六本木六丁目９番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%85%AD%E6%9C%AC%E6%9C%A86-9-1"
  },
  "todai": {
    "lat": 35.714146,
    "lon": 139.763214,
    "query": "東京都文京区本郷7-3-1",
    "matched": "東京都文京区本郷七丁目３番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%87%E4%BA%AC%E5%8C%BA%E6%9C%AC%E9%83%B77-3-1"
  },
  "hanayama": {
    "lat": 35.669971,
    "lon": 139.769073,
    "query": "東京都中央区銀座3-14-13",
    "matched": "東京都中央区銀座三丁目１４番１３号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E9%8A%80%E5%BA%A73-14-13"
  },
  "glitch": {
    "lat": 35.66885,
    "lon": 139.768677,
    "query": "東京都中央区銀座4-14-8",
    "matched": "東京都中央区銀座四丁目１４番８号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E9%8A%80%E5%BA%A74-14-8"
  },
  "teamlab": {
    "lat": 35.662209,
    "lon": 139.743073,
    "query": "東京都港区虎ノ門5-9 麻布台ヒルズ ガーデンプラザB B1",
    "matched": "東京都港区虎ノ門五丁目９番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%99%8E%E3%83%8E%E9%96%805-9+%E9%BA%BB%E5%B8%83%E5%8F%B0%E3%83%92%E3%83%AB%E3%82%BA+%E3%82%AC%E3%83%BC%E3%83%87%E3%83%B3%E3%83%97%E3%83%A9%E3%82%B6B+B1"
  },
  "sushi-yu": {
    "lat": 35.673023,
    "lon": 139.769836,
    "query": "東京都中央区銀座1-14-6",
    "matched": "東京都中央区銀座一丁目１４番６号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E9%8A%80%E5%BA%A71-14-6"
  },
  "gonpachi": {
    "lat": 35.66045,
    "lon": 139.723404,
    "query": "東京都港区西麻布1-13-11",
    "matched": "東京都港区西麻布一丁目１３番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E8%A5%BF%E9%BA%BB%E5%B8%831-13-11"
  },
  "meat-man": {
    "lat": 35.664017,
    "lon": 139.733261,
    "query": "東京都港区六本木4-8-8",
    "matched": "東京都港区六本木四丁目８番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E5%85%AD%E6%9C%AC%E6%9C%A84-8-8"
  },
  "yoyogi-park": {
    "lat": 35.66917,
    "lon": 139.70166,
    "query": "東京都渋谷区代々木神園町2-1",
    "matched": "東京都渋谷区代々木神園町２番１号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E4%BB%A3%E3%80%85%E6%9C%A8%E7%A5%9E%E5%9C%92%E7%94%BA2-1"
  },
  "gotokuji": {
    "lat": 35.647671,
    "lon": 139.647202,
    "query": "東京都世田谷区豪徳寺2-24-7",
    "matched": "東京都世田谷区豪徳寺二丁目２４番７号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%96%E7%94%B0%E8%B0%B7%E5%8C%BA%E8%B1%AA%E5%BE%B3%E5%AF%BA2-24-7"
  },
  "ogawa-azabudai": {
    "lat": 35.662197,
    "lon": 139.741791,
    "query": "東京都港区麻布台1-2-4",
    "matched": "東京都港区麻布台一丁目２番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%AF%E5%8C%BA%E9%BA%BB%E5%B8%83%E5%8F%B01-2-4"
  },
  "shinchan": {
    "lat": 35.681252,
    "lon": 139.767242,
    "query": "東京都千代田区丸の内1-9-1",
    "matched": "東京都千代田区丸の内一丁目９番",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA%E4%B8%B8%E3%81%AE%E5%86%851-9-1"
  },
  "echire-isetan": {
    "lat": 35.691074,
    "lon": 139.704651,
    "query": "東京都新宿区新宿3-14-1",
    "matched": "東京都新宿区新宿三丁目１４番１号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%96%B0%E5%AE%BF%E5%8C%BA%E6%96%B0%E5%AE%BF3-14-1"
  },
  "higuma": {
    "lat": 35.667854,
    "lon": 139.71051,
    "query": "東京都渋谷区神宮前4-9-13",
    "matched": "東京都渋谷区神宮前四丁目９番１３号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B8%8B%E8%B0%B7%E5%8C%BA%E7%A5%9E%E5%AE%AE%E5%89%8D4-9-13"
  },
  "ginza": {
    "lat": 35.669445,
    "lon": 139.763351,
    "query": "東京都中央区銀座6-10-1",
    "matched": "東京都中央区銀座六丁目１０番１号",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E9%8A%80%E5%BA%A76-10-1"
  },
  "sunnide": {
    "lat": 35.531796,
    "lon": 138.747787,
    "query": "山梨県南都留郡富士河口湖町大石2549-1",
    "matched": "山梨県富士河口湖町大石２５４９番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E5%B1%B1%E6%A2%A8%E7%9C%8C%E5%8D%97%E9%83%BD%E7%95%99%E9%83%A1%E5%AF%8C%E5%A3%AB%E6%B2%B3%E5%8F%A3%E6%B9%96%E7%94%BA%E5%A4%A7%E7%9F%B32549-1"
  },
  "oishi": {
    "lat": 35.52329,
    "lon": 138.74654,
    "query": "大石公園（OpenStreetMap park）",
    "matched": "大石公園（OpenStreetMap park）",
    "source": "https://www.openstreetmap.org/?mlat=35.52329&mlon=138.74654#map=18/35.52329/138.74654"
  },
  "lake": {
    "lat": 35.52181,
    "lon": 138.75747,
    "query": "長崎公園（OpenStreetMap park）",
    "matched": "長崎公園（OpenStreetMap park）",
    "source": "https://www.openstreetmap.org/?mlat=35.52181&mlon=138.75747#map=18/35.52181/138.75747"
  },
  "maple": {
    "lat": 35.52559,
    "lon": 138.76244,
    "query": "もみじ回廊（OpenStreetMap attraction）",
    "matched": "もみじ回廊（OpenStreetMap attraction）",
    "source": "https://www.openstreetmap.org/?mlat=35.52559&mlon=138.76244#map=18/35.52559/138.76244"
  },
  "hyatt": {
    "lat": 34.98861,
    "lon": 135.7737,
    "query": "ハイアットリージェンシー京都（OpenStreetMap hotel）",
    "matched": "ハイアットリージェンシー京都（OpenStreetMap hotel）",
    "source": "https://www.openstreetmap.org/?mlat=34.98861&mlon=135.7737#map=18/34.98861/135.7737"
  },
  "smart-coffee": {
    "lat": 35.00927,
    "lon": 135.767014,
    "query": "京都府京都市中京区天性寺前町537",
    "matched": "京都府京都市中京区天性寺前町５３７番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A4%A9%E6%80%A7%E5%AF%BA%E5%89%8D%E7%94%BA537"
  },
  "umezono-teramachi": {
    "lat": 35.00927,
    "lon": 135.767014,
    "query": "京都府京都市中京区天性寺前町526",
    "matched": "京都府京都市中京区天性寺前町５２６番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%A4%A9%E6%80%A7%E5%AF%BA%E5%89%8D%E7%94%BA526"
  },
  "teramachi": {
    "lat": 35.00724,
    "lon": 135.76724,
    "query": "新京極（OpenStreetMap information board, mid-arcade）",
    "matched": "新京極（OpenStreetMap information board, mid-arcade）",
    "source": "https://www.openstreetmap.org/?mlat=35.00724&mlon=135.76724#map=18/35.00724/135.76724"
  },
  "hoho": {
    "lat": 34.98535,
    "lon": 135.75876,
    "query": "京都駅（OpenStreetMap station; HOHO has shops at the central and Hachijo exits）",
    "matched": "京都駅（OpenStreetMap station; HOHO has shops at the central and Hachijo exits）",
    "source": "https://www.openstreetmap.org/?mlat=34.98535&mlon=135.75876#map=18/34.98535/135.75876"
  },
  "kyo-chabana": {
    "lat": 34.987511,
    "lon": 135.758621,
    "query": "京都府京都市下京区東塩小路町578",
    "matched": "京都府京都市下京区東塩小路町５７８番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%9D%B1%E5%A1%A9%E5%B0%8F%E8%B7%AF%E7%94%BA578"
  },
  "lorimer": {
    "lat": 34.993584,
    "lon": 135.76088,
    "query": "京都府京都市下京区橋詰町143",
    "matched": "京都府京都市下京区橋詰町１４３番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E6%A9%8B%E8%A9%B0%E7%94%BA143"
  },
  "ichikawaya": {
    "lat": 34.993179,
    "lon": 135.774582,
    "query": "京都府京都市東山区鐘鋳町396-2",
    "matched": "京都府京都市東山区鐘鋳町３９６番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E9%90%98%E9%8B%B3%E7%94%BA396-2"
  },
  "kimono": {
    "lat": 34.994614,
    "lon": 135.776001,
    "query": "京都府京都市東山区遊行前町559",
    "matched": "京都府京都市東山区遊行前町５５９番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E9%81%8A%E8%A1%8C%E5%89%8D%E7%94%BA559"
  },
  "sumi-roman": {
    "lat": 35.005589,
    "lon": 135.762253,
    "query": "京都府京都市中京区貝屋町561",
    "matched": "京都府京都市中京区貝屋町５６１番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%B2%9D%E5%B1%8B%E7%94%BA561"
  },
  "kyoboshi": {
    "lat": 35.00478,
    "lon": 135.775681,
    "query": "京都府京都市東山区祇園町北側347",
    "matched": "京都府京都市東山区祇園町北側３４７番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E7%A5%87%E5%9C%92%E7%94%BA%E5%8C%97%E5%81%B4347"
  },
  "daimaru-kyoto": {
    "lat": 35.003681,
    "lon": 135.761841,
    "query": "京都府京都市下京区立売西町79",
    "matched": "京都府京都市下京区立売西町",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%8B%E4%BA%AC%E5%8C%BA%E7%AB%8B%E5%A3%B2%E8%A5%BF%E7%94%BA79"
  },
  "kiyomizu": {
    "lat": 34.99588,
    "lon": 135.783142,
    "query": "京都府京都市東山区清水1-294",
    "matched": "京都府京都市東山区清水一丁目２９４番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%B8%85%E6%B0%B41-294"
  },
  "tofukuji": {
    "lat": 34.977444,
    "lon": 135.773529,
    "query": "京都府京都市東山区本町15-778",
    "matched": "京都府京都市東山区本町十五丁目７７８番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E6%9D%B1%E5%B1%B1%E5%8C%BA%E6%9C%AC%E7%94%BA15-778"
  },
  "fushimi-inari": {
    "lat": 34.967037,
    "lon": 135.773499,
    "query": "京都府京都市伏見区深草藪之内町68",
    "matched": "京都府京都市伏見区深草藪之内町６８番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%BC%8F%E8%A6%8B%E5%8C%BA%E6%B7%B1%E8%8D%89%E8%97%AA%E4%B9%8B%E5%86%85%E7%94%BA68"
  },
  "byodoin": {
    "lat": 34.889317,
    "lon": 135.807281,
    "query": "京都府宇治市宇治蓮華116",
    "matched": "京都府宇治市宇治蓮華１１６番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E5%AE%87%E6%B2%BB%E5%B8%82%E5%AE%87%E6%B2%BB%E8%93%AE%E8%8F%AF116"
  },
  "tokichi-uji": {
    "lat": 34.889328,
    "lon": 135.802032,
    "query": "京都府宇治市宇治壱番10",
    "matched": "京都府宇治市宇治壱番１０番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E5%AE%87%E6%B2%BB%E5%B8%82%E5%AE%87%E6%B2%BB%E5%A3%B1%E7%95%AA10"
  },
  "eikando": {
    "lat": 35.013435,
    "lon": 135.794403,
    "query": "京都府京都市左京区永観堂町48",
    "matched": "京都府京都市左京区永観堂町４８番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E5%B7%A6%E4%BA%AC%E5%8C%BA%E6%B0%B8%E8%A6%B3%E5%A0%82%E7%94%BA48"
  },
  "ippodo": {
    "lat": 35.014042,
    "lon": 135.767441,
    "query": "京都府京都市中京区常盤木町52",
    "matched": "京都府京都市中京区常盤木町５２番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E5%B8%B8%E7%9B%A4%E6%9C%A8%E7%94%BA52"
  },
  "blend-kyoto": {
    "lat": 35.010452,
    "lon": 135.760803,
    "query": "京都府京都市中京区笹屋町447",
    "matched": "京都府京都市中京区笹屋町４４７番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E7%AC%B9%E5%B1%8B%E7%94%BA447"
  },
  "to-kyoto": {
    "lat": 35.011623,
    "lon": 135.761734,
    "query": "京都府京都市中京区高田町500",
    "matched": "京都府京都市中京区高田町",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E9%AB%98%E7%94%B0%E7%94%BA"
  },
  "flip-up": {
    "lat": 35.0110,
    "lon": 135.7615,
    "query": "京都府京都市中京区押小路通室町東入蛸薬師町292-2（烏丸御池駅徒歩約4分・近傍座標）",
    "matched": "烏丸御池・押小路室町近傍（店址精確點位待現場確認）",
    "source": "https://tabelog.com/kyoto/A2601/A260202/26004579/"
  },
  "yugen": {
    "lat": 35.016113,
    "lon": 135.758575,
    "query": "京都府京都市中京区亀屋町146",
    "matched": "京都府京都市中京区亀屋町１４６番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%BA%80%E5%B1%8B%E7%94%BA146"
  },
  "okuniya-mambei": {
    "lat": 35.005508,
    "lon": 135.763458,
    "query": "京都府京都市中京区菊屋町534",
    "matched": "京都府京都市中京区菊屋町５３４番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E8%8F%8A%E5%B1%8B%E7%94%BA534"
  },
  "marukyu-nishinotoin": {
    "lat": 35.010254,
    "lon": 135.75499,
    "query": "京都府京都市中京区三坊西洞院町561",
    "matched": "京都府京都市中京区三坊西洞院町５６１番地",
    "source": "https://msearch.gsi.go.jp/address-search/AddressSearch?q=%E4%BA%AC%E9%83%BD%E5%BA%9C%E4%BA%AC%E9%83%BD%E5%B8%82%E4%B8%AD%E4%BA%AC%E5%8C%BA%E4%B8%89%E5%9D%8A%E8%A5%BF%E6%B4%9E%E9%99%A2%E7%94%BA561"
  },
  "umeda": {
    "lat": 34.7032689,
    "lon": 135.4962444,
    "query": "ルクア大阪 大阪駅",
    "matched": "ルクア大阪",
    "source": "https://www.openstreetmap.org/way/1313244351"
  }
};

/* How we travel between stops: train or bus line, boarding and alighting stations, taxis, and minutes from the itinerary notes.
   Station points come from OpenStreetMap (via OpenFreeMap). Legs are listed in visiting order and matched by
   their destination; `w: 'est'` means the walking time is estimated from distance, `w: 0` means not stated. */
window.TRIP_MAP_ROUTES = {
  cities: [
    { id: 'tokyo', city: 'tokyo', name: ['東京', 'Tokyo'], match: '東京', hotel: 'aoyama', rings: [1, 3, 5, 7] },
    { id: 'kawaguchiko', city: 'tokyo', name: ['河口湖', 'Kawaguchiko'], match: '河口湖', hotel: 'sunnide', rings: [1, 2, 4] },
    { id: 'kyoto', city: 'tokyo', name: ['京都', 'Kyoto'], match: '京都', hotel: 'hyatt', rings: [1, 3, 5, 10] }
  ],
  airports: {
    narita: { name: ['成田機場', 'Narita Airport'], lon: 140.3929, lat: 35.772 },
    kix: { name: ['關西機場 第一航廈', 'Kansai Airport Terminal 1'], lon: 135.2437, lat: 34.4347 }
  },
  spots: {
    gion: { name: ['祇園', 'Gion'], lon: 135.77479, lat: 35.00252 }
  },
  stations: {
    'gaiemmae': { name: ['外苑前', 'Gaiemmae'], lon: 139.71789, lat: 35.67047 },
    'omotesando': { name: ['表參道', 'Omotesando'], lon: 139.71254, lat: 35.66516 },
    'aoyama-itchome': { name: ['青山一丁目', 'Aoyama-itchome'], lon: 139.72401, lat: 35.67278 },
    'meiji-jingumae': { name: ['明治神宮前', 'Meiji-jingumae'], lon: 139.70436, lat: 35.66897 },
    'shinjuku-sanchome': { name: ['新宿三丁目', 'Shinjuku-sanchome'], lon: 139.70478, lat: 35.69074 },
    'shinjuku': { name: ['新宿', 'Shinjuku'], lon: 139.7006, lat: 35.69 },
    'harajuku': { name: ['原宿', 'Harajuku'], lon: 139.70243, lat: 35.67021 },
    'shinanomachi': { name: ['信濃町', 'Shinanomachi'], lon: 139.72049, lat: 35.68003 },
    'ginza': { name: ['銀座', 'Ginza'], lon: 139.7631, lat: 35.67284 },
    'higashi-ginza': { name: ['東銀座', 'Higashi-Ginza'], lon: 139.76695, lat: 35.66968 },
    'kyobashi': { name: ['京橋', 'Kyobashi'], lon: 139.77004, lat: 35.6767 },
    'tokyo': { name: ['東京', 'Tokyo'], lon: 139.7667, lat: 35.68126 },
    'hongo-sanchome': { name: ['本鄉三丁目', 'Hongo-sanchome'], lon: 139.75997, lat: 35.70664 },
    'todaimae': { name: ['東大前', 'Todaimae'], lon: 139.75817, lat: 35.71734 },
    'roppongi-itchome': { name: ['六本木一丁目', 'Roppongi-itchome'], lon: 139.73885, lat: 35.66498 },
    'kamiyacho': { name: ['神谷町', 'Kamiyacho'], lon: 139.74505, lat: 35.66296 },
    'roppongi': { name: ['六本木', 'Roppongi'], lon: 139.73133, lat: 35.66284 },
    'sangen-jaya': { name: ['三軒茶屋', 'Sangen-jaya'], lon: 139.66907, lat: 35.64406 },
    'miyanosaka': { name: ['宮の坂', 'Miyanosaka'], lon: 139.64499, lat: 35.64783 },
    'gotokuji': { name: ['豪德寺', 'Gotokuji'], lon: 139.64685, lat: 35.65354 },
    'yoyogi-hachiman': { name: ['代代木八幡', 'Yoyogi-Hachiman'], lon: 139.68884, lat: 35.66962 },
    'kawaguchiko': { name: ['河口湖', 'Kawaguchiko'], lon: 138.76898, lat: 35.49804 },
    'mishima': { name: ['三島', 'Mishima'], lon: 138.91084, lat: 35.12588 },
    'kyoto': { name: ['京都', 'Kyoto'], lon: 135.75876, lat: 34.98535 },
    'kyoto-karasuma': { name: ['京都', 'Kyoto'], lon: 135.76006, lat: 34.98619 },
    'shijo': { name: ['四條', 'Shijo'], lon: 135.75966, lat: 35.00247 },
    'tofukuji-station': { name: ['東福寺', 'Tofukuji'], lon: 135.76993, lat: 34.98099 },
    'inari': { name: ['稻荷', 'Inari'], lon: 135.77067, lat: 34.96681 },
    'uji': { name: ['宇治', 'Uji'], lon: 135.8007, lat: 34.89041 },
    'kansai-airport': { name: ['關西機場', 'Kansai Airport'], lon: 135.24342, lat: 34.43593 },
    'hankyu-karasuma': { name: ['阪急烏丸', 'Hankyu Karasuma'], lon: 135.7597, lat: 35.0035 },
    'hankyu-umeda': { name: ['阪急大阪梅田', 'Hankyu Osaka-Umeda'], lon: 135.4983721, lat: 34.7054194 },
    osaka: { name: ['大阪', 'Osaka'], lon: 135.4961773, lat: 34.7025087 },
    'jingumae-2-bus': { name: ['神宮前二丁目', 'Jingumae 2-chome'], lon: 139.71101, lat: 35.67476 },
    'yoyogi-bus': { name: ['代々木駅', 'Yoyogi Station'], lon: 139.70199, lat: 35.68226 }
  },
  lines: {
    G: { name: ['銀座線', 'Ginza Line'], color: '#f39700' },
    M: { name: ['丸之內線', 'Marunouchi Line'], color: '#e60012' },
    H: { name: ['日比谷線', 'Hibiya Line'], color: '#8fa4ae' },
    N: { name: ['南北線', 'Namboku Line'], color: '#00ada9' },
    Z: { name: ['半藏門線（直通田園都市線）', 'Hanzomon Line (through to Den-en-toshi)'], color: '#8f76d6' },
    F: { name: ['副都心線', 'Fukutoshin Line'], color: '#9c5e31' },
    E: { name: ['大江戶線', 'Oedo Line'], color: '#ce045b' },
    JY: { name: ['JR 山手線', 'JR Yamanote Line'], color: '#80c241', square: true },
    JB: { name: ['JR 中央・總武線', 'JR Chuo-Sobu Line'], color: '#f5c400', square: true },
    SG: { name: ['世田谷線', 'Setagaya Line'], color: '#f2b705' },
    OH: { name: ['小田急線', 'Odakyu Line'], color: '#1d8acb' },
    HB: { name: ['ハチ公巴士', 'Hachikō Bus'], color: '#d9822b', square: true },
    FX: { name: ['富士回遊', 'Fuji Excursion'], color: '#c94b2a', square: true },
    BS: { name: ['三島・河口湖 Liner 巴士', 'Mishima–Kawaguchiko Liner bus'], color: '#6b7f3a', square: true },
    SK: { name: ['東海道新幹線', 'Tokaido Shinkansen'], color: '#123f87', square: true },
    D: { name: ['JR 奈良線', 'JR Nara Line'], color: '#9a7b3c', square: true },
    K: { name: ['烏丸線', 'Karasuma Line'], color: '#3ca13d' },
    HA: { name: ['HARUKA', 'HARUKA'], color: '#0f9bd7', square: true },
    HK: { name: ['阪急京都線', 'Hankyu Kyoto Line'], color: '#8a1c2b' },
    JK: { name: ['JR 京都線 新快速', 'JR Kyoto Line Special Rapid'], color: '#0072bc', square: true }
  },
  areas: [
    { id: 'gaien', city: 'tokyo', name: ['外苑', 'Gaien'], places: ['ginkgo', 'hm-cafe'] },
    { id: 'omotesando', city: 'tokyo', name: ['表參道・南青山', 'Omotesando / Minami-Aoyama'], short: ['表參道', 'Omotesando'], places: ['mameya', 'nezu', 'ippodo-aoyama', 'gentle-monster', 'higuma', 'afuri', 'yoroniku'] },
    { id: 'harajuku', city: 'tokyo', name: ['原宿・貓街', 'Harajuku'], places: ['human-tokyo'] },
    { id: 'roppongi', city: 'tokyo', name: ['六本木・西麻布', 'Roppongi'], places: ['roppongi-hills', 'meat-man', 'gonpachi'] },
    { id: 'tomigaya', city: 'tokyo', name: ['富谷・代代木公園', 'Tomigaya / Yoyogi'], places: ['fuglen-tokyo', 'yoyogi-park'] },
    { id: 'gyoen', city: 'tokyo', name: ['新宿御苑・代々木', 'Shinjuku Gyoen / Yoyogi'], short: ['新宿御苑', 'Shinjuku Gyoen'], places: ['gyoen', 'tanbo'] },
    { id: 'azabudai', city: 'tokyo', name: ['麻布台', 'Azabudai'], places: ['ogawa-azabudai', 'teamlab'] },
    { id: 'shinjuku', city: 'tokyo', name: ['新宿', 'Shinjuku'], places: ['shinjuku-cat', 'gelato-pique', 'echire-isetan'] },
    { id: 'ginza', city: 'tokyo', name: ['銀座', 'Ginza'], places: ['hanayama', 'glitch', 'ginza', 'sushi-yu'] },
    { id: 'tokyo-station', city: 'tokyo', name: ['東京車站', 'Tokyo Station'], places: ['shinchan'] },
    { id: 'hongo', city: 'tokyo', name: ['本鄉・東大', 'Hongo'], places: ['todai'] },
    { id: 'gotokuji', city: 'tokyo', name: ['豪德寺', 'Gotokuji'], places: ['gotokuji'] },
    { id: 'north-shore', city: 'kawaguchiko', name: ['河口湖北岸', 'North shore'], places: ['oishi', 'lake'] },
    { id: 'momiji', city: 'kawaguchiko', name: ['紅葉迴廊', 'Maple corridor'], places: ['maple'] },
    { id: 'kyoto-station', city: 'kyoto', name: ['京都車站', 'Kyoto Station'], places: ['hoho', 'kyo-chabana'] },
    { id: 'gojo', city: 'kyoto', name: ['五條', 'Gojo'], places: ['lorimer'] },
    { id: 'higashiyama', city: 'kyoto', name: ['東山・清水寺', 'Higashiyama / Kiyomizu'], short: ['清水寺', 'Kiyomizu'], places: ['ichikawaya', 'kimono', 'kiyomizu'] },
    { id: 'gion', city: 'kyoto', name: ['祇園', 'Gion'], places: ['kyoboshi'] },
    { id: 'tofukuji', city: 'kyoto', name: ['東福寺', 'Tofukuji'], places: ['tofukuji'] },
    { id: 'fushimi', city: 'kyoto', name: ['伏見稻荷', 'Fushimi Inari'], places: ['fushimi-inari'] },
    { id: 'uji', city: 'kyoto', name: ['宇治', 'Uji'], places: ['byodoin', 'tokichi-uji'] },
    { id: 'okazaki', city: 'kyoto', name: ['永觀堂・南禪寺', 'Eikando / Nanzenji'], short: ['永觀堂', 'Eikando'], places: ['eikando'] },
    { id: 'teramachi', city: 'kyoto', name: ['寺町・河原町', 'Teramachi / Kawaramachi'], short: ['寺町', 'Teramachi'], places: ['smart-coffee', 'umezono-teramachi', 'teramachi', 'ippodo'] },
    { id: 'oike', city: 'kyoto', name: ['御所南・烏丸御池', 'Gosho-minami / Karasuma Oike'], short: ['烏丸御池', 'Karasuma Oike'], places: ['to-kyoto', 'blend-kyoto', 'flip-up', 'yugen', 'marukyu-nishinotoin'] },
    { id: 'shijo-karasuma', city: 'kyoto', name: ['四條烏丸・錦', 'Shijo-Karasuma / Nishiki'], short: ['四條烏丸', 'Shijo-Karasuma'], places: ['okuniya-mambei', 'daimaru-kyoto', 'sumi-roman'] }
  ],
  days: {
    '2026-11-20': {
      tab: ['抵達日', 'Arrival'],
      title: ['第一晚，只留在飯店附近', 'Stay close to the hotel on arrival night'],
      start: 'narita',
      legs: [
        { to: 'aoyama', s: [{ car: 68 }], note: ['先搭免費接駁巴士到 T2，司機在 Door North 3 等', 'Free shuttle bus to T2; the driver waits at Door North 3'] },
        { to: 'afuri', s: [{ w: 'est' }] },
        { to: 'aoyama', s: [{ w: 'est' }] }
      ]
    },
    '2026-11-21': {
      tab: ['御苑・青山', 'Garden / Aoyama'],
      title: ['先往北去御苑，再回青山逛街', 'North to the garden, then back to Aoyama'],
      legs: [
        { to: 'hm-cafe', s: [{ w: 8 }] },
        { to: 'tanbo', s: [{ w: 4 }, { l: 'HB', a: 'jingumae-2-bus', b: 'yoyogi-bus', m: 22 }, { w: 3 }], note: ['神宮の杜ルート 8:11 班，繞經千駄ヶ谷、北參道；同名的都營巴士站在店門口，不是這個', 'Jingu-no-Mori route, 8:11 bus, looping via Sendagaya and Kitasando; the Toei stop of the same name by the shop is a different one'], alt: ['或計程車約 8 分', 'Or a taxi, about 8 min'] },
        { to: 'gyoen', s: [{ w: '12–15' }], note: ['從新宿門進', 'Enter by the Shinjuku gate'] },
        { to: 'ginkgo', s: [{ w: 15 }], note: ['千駄ヶ谷門出，經國立競技場到並木北端', 'Leave by the Sendagaya gate, past the National Stadium to the north end'] },
        { to: 'hm-cafe', s: [{ w: 10 }], note: ['回來買聯名商品', 'Back for the collaboration goods'] },
        { to: 'mameya', s: [{ w: 'est' }], note: ['中間可選：表參道輕食、散步', 'Optional on the way: a light lunch and an Omotesando stroll'] },
        { to: 'nezu', s: [{ w: 12 }] },
        { to: 'ippodo-aoyama', s: [{ w: '5–10' }] },
        { to: 'gentle-monster', s: [{ w: 8 }] },
        { to: 'human-tokyo', s: [{ w: 'est' }], note: ['沿御幸通、貓街邊走邊逛', 'Shop along Miyuki-dori and Cat Street'] },
        { to: 'aoyama', s: [{ w: 0 }, { l: 'G', a: 'omotesando', b: 'gaiemmae', n: 1 }] },
        { to: 'yoroniku', s: [{ l: 'G', a: 'gaiemmae', b: 'omotesando', n: 1 }, { w: 10 }], alt: ['或從飯店散步 20–25 分', 'Or walk from the hotel, 20–25 min'] },
        { to: 'aoyama', s: [{ w: 'est' }] }
      ]
    },
    '2026-11-22': {
      tab: ['銀座・東側', 'Ginza / East'],
      title: ['東邊的一天：銀座、麻布台與東京車站', 'An eastern day: Ginza, Azabudai and Tokyo Station'],
      legs: [
        { to: 'hanayama', s: [{ l: 'G', a: 'gaiemmae', b: 'ginza', m: 15 }, { w: 7 }] },
        { to: 'glitch', s: [{ w: 3 }], note: ['先抽號碼牌，再去喝咖啡', 'Get the queue ticket first, then coffee'] },
        { to: 'hanayama', s: [{ w: 3 }] },
        { to: 'todai', s: [{ w: 8 }, { l: 'M', a: 'ginza', b: 'hongo-sanchome', m: 12 }, { w: 8 }] },
        { to: 'ogawa-azabudai', s: [{ l: 'N', a: 'todaimae', b: 'roppongi-itchome', m: 20 }, { w: 0 }], note: ['地下通道直通麻布台之丘', 'Underground passage to Azabudai Hills'] },
        { to: 'teamlab', s: [{ w: 'est' }], note: ['隔壁棟', 'Next building'] },
        { to: 'shinchan', s: [{ l: 'H', a: 'kamiyacho', b: 'ginza', m: 6, n: 3 }, { l: 'M', a: 'ginza', b: 'tokyo', n: 1 }, { w: 10 }], t: '30' },
        { to: 'ginza', s: [{ l: 'M', a: 'tokyo', b: 'ginza', n: 1 }] },
        { to: 'sushi-yu', s: [{ w: 10 }] },
        { to: 'aoyama', s: [{ w: 8 }, { l: 'G', a: 'kyobashi', b: 'gaiemmae', m: 15 }] }
      ],
      alts: [
        { skip: 'todai', s: [{ l: 'H', a: 'higashi-ginza', b: 'kamiyacho', m: 10 }], label: ['跳過東大的話', 'If we skip UTokyo'] }
      ]
    },
    '2026-11-23': {
      tab: ['豪德寺・西側', 'Gotokuji / West'],
      title: ['先往西看招財貓，再繞回市中心', 'West to the lucky cats, then back across the city'],
      legs: [
        { to: 'higuma', s: [{ w: 9 }] },
        { to: 'gotokuji', s: [{ w: 0 }, { l: 'Z', a: 'omotesando', b: 'sangen-jaya', m: 10, n: 3 }, { w: 3 }, { l: 'SG', a: 'sangen-jaya', b: 'miyanosaka', m: 15 }, { w: 5 }], t: '35–40', note: ['世田谷線有機會搭到招財貓電車', 'The Setagaya Line may run the lucky-cat tram'] },
        { to: 'fuglen-tokyo', s: [{ l: 'OH', a: 'gotokuji', b: 'yoyogi-hachiman', m: 15 }, { w: 3 }] },
        { to: 'yoyogi-park', s: [{ w: 'est' }], note: ['途中外帶八十八 Hatoya 抹茶', 'Pick up Hatoya matcha on the way'] },
        { to: 'shinjuku-cat', s: [{ w: 0 }, { l: 'JY', a: 'harajuku', b: 'shinjuku', m: 4 }], note: ['穿過公園走到原宿門', 'Walk through the park to the Harajuku gate'] },
        { to: 'gelato-pique', s: [{ w: 'est' }] },
        { to: 'echire-isetan', s: [{ w: 'est' }] },
        { to: 'ginkgo', s: [{ l: 'JB', a: 'shinjuku', b: 'shinanomachi', m: 6, n: 3 }, { w: 7 }] },
        { to: 'roppongi-hills', s: [{ w: 0 }, { l: 'G', a: 'gaiemmae', b: 'aoyama-itchome', n: 1 }, { l: 'E', a: 'aoyama-itchome', b: 'roppongi', n: 2 }, { w: 5 }], t: '20' },
        { to: 'meat-man', s: [{ w: 8 }], note: ['19:00 已訂', 'Booked for 19:00'] },
        { to: 'aoyama', s: [{ w: 'est' }, { l: 'E', a: 'roppongi', b: 'aoyama-itchome', n: 2 }, { l: 'G', a: 'aoyama-itchome', b: 'gaiemmae', n: 1 }] }
      ]
    },
    '2026-11-24': {
      tab: ['富士山・溫泉', 'Fuji / onsen'],
      title: ['坐富士回遊到河口湖，下午留給湖畔', 'Fuji Excursion to the lake; the afternoon is for the shore'],
      legs: [
        { to: 'oishi', s: [{ taxi: 0 }, { l: 'FX', a: 'shinjuku', b: 'kawaguchiko', dep: '11:34', arr: '13:31' }, { taxi: '15–20', to: 'sunnide' }, { w: 'est' }], note: ['富士回遊 93 號已訂妥（5 號車），午餐在新宿站買便當上車吃。到河口湖站直接搭計程車到飯店寄放行李，走去大石公園', 'Fuji Excursion 93 is booked (car 5); lunch is a bento from Shinjuku Station, eaten on the train. From Kawaguchiko Station, take a taxi to the hotel to drop the bags and walk to Oishi Park'] },
        { to: 'sunnide', s: [{ w: 'est' }] },
        { to: 'maple', s: [] },
        { to: 'sunnide', s: [] }
      ]
    },
    '2026-11-25': {
      tab: ['移動・寺町', 'Transfer / Teramachi'],
      title: ['巴士和新幹線到京都，傍晚逛寺町', 'Bus and Shinkansen to Kyoto, then an evening on Teramachi'],
      legs: [
        { to: 'lake', s: [{ w: 'est' }], note: ['先吃和朝食，再看天氣與能見度', 'Japanese breakfast first, then check the weather and visibility'] },
        { to: 'hyatt', s: [{ w: 'est', to: 'sunnide' }, { taxi: 0 }, { l: 'BS', a: 'kawaguchiko', b: 'mishima', dep: '11:20', arr: '12:50' }, { l: 'SK', a: 'mishima', b: 'kyoto', dep: '13:46', arr: '15:37' }, { taxi: 10 }], note: ['巴士 11:20 已訂，新幹線 13:46 ひかり 713 已訂（13 號車），延誤改 13:55 こだま 827', 'Bus 11:20 booked; Shinkansen Hikari 713 at 13:46 booked (car 13); if late, Kodama 827 at 13:55'] },
        { to: 'smart-coffee', s: [{ taxi: '15–20' }] },
        { to: 'umezono-teramachi', s: [{ w: 1 }] },
        { to: 'teramachi', s: [{ w: 'est' }], note: ['安靜的往北，熱鬧的往南；天黑後到先斗町', 'Quieter streets to the north, busier arcades to the south; Pontocho after dark'] },
        { to: 'hoho', s: [{ w: 15 }, { l: 'K', a: 'shijo', b: 'kyoto-karasuma', m: 4, n: 2 }], alt: ['或在四條河原町搭計程車約 15 分', 'Or a taxi from Shijo-Kawaramachi, about 15 min'] },
        { to: 'kyo-chabana', s: [{ w: 3 }] },
        { to: 'hyatt', s: [{ taxi: 10 }] }
      ]
    },
    '2026-11-26': {
      tab: ['和服・宇治', 'Kimono / Uji'],
      title: ['東山穿和服，一路往南到伏見和宇治', 'Kimono in Higashiyama, then south to Fushimi and Uji'],
      legs: [
        { to: 'ichikawaya', s: [{ w: '10–15' }], alt: ['或短程計程車', 'Or a short taxi'] },
        { to: 'kimono', s: [{ taxi: '5–10' }] },
        { to: 'kiyomizu', s: [{ w: 'est' }], note: ['穿和服走二年坂、三年坂上去', 'Walk up Ninenzaka and Sannenzaka in kimono'] },
        { to: 'tofukuji', s: [{ taxi: '10–15' }] },
        { to: 'fushimi-inari', s: [{ w: 0 }, { l: 'D', a: 'tofukuji-station', b: 'inari', n: 1 }] },
        { to: 'byodoin', s: [{ l: 'D', a: 'inari', b: 'uji', m: 20 }, { w: 10 }], note: ['先到中村藤吉抽整理券', 'Get a ticket at Nakamura Tokichi first'] },
        { to: 'tokichi-uji', s: [{ w: 'est' }], note: ['叫號後回來', 'Come back when called'] },
        { to: 'kimono', s: [{ w: 0 }, { l: 'D', a: 'uji', b: 'kyoto', m: 17 }, { taxi: 15 }], note: ['約 17:00 前還和服', 'Return the kimono by about 17:00'] },
        { to: 'kyoboshi', s: [{ taxi: 10 }], note: ['18:30 入席，先吃飯再去永觀堂', 'Sit at 18:30; dinner first, then Eikando'] },
        { to: 'eikando', s: [{ taxi: 15 }], note: ['受付到 20:30，21:00 閉門', 'Entry until 20:30; closes 21:00'] },
        { to: 'hyatt', s: [{ taxi: '15–20' }] }
      ]
    },
    '2026-11-27': {
      tab: ['茶舖・大阪', 'Tea / Osaka'],
      title: ['To. 早餐後短逛御所南，午餐後去大阪', 'To. breakfast, a short Gosho-minami morning, then Osaka'],
      legs: [
        { to: 'to-kyoto', s: [{ taxi: '15–20' }], note: ['8:00 モーニング，7:55 到', '8:00 morning; arrive 7:55'] },
        { to: 'flip-up', s: [{ w: 'est' }], note: ['買麵包外帶', 'Takeaway bread'] },
        { to: 'blend-kyoto', s: [{ w: 'est' }], note: ['10:00 開門，不久留', 'Opens 10:00; short stop'] },
        { to: 'ippodo', s: [{ w: 7 }] },
        { to: 'yugen', s: [{ w: 'est' }], note: ['11:00 開門', 'Opens 11:00'] },
        { to: 'marukyu-nishinotoin', s: [{ w: 'est' }], note: ['午餐前短坐抹茶', 'Short matcha before lunch'] },
        { to: 'okuniya-mambei', s: [{ w: 'est' }], note: ['12:30 已訂，限 1 小時', '12:30 booked; 1 hour'] },
        { to: 'umeda', s: [{ w: 3 }, { l: 'HK', a: 'hankyu-karasuma', b: 'hankyu-umeda', m: 43 }], note: ['阪急特急，刷 Suica；不要先回飯店', 'Hankyu limited express, tap Suica; skip the hotel first'] },
        { to: 'hyatt', s: [{ w: 0 }, { l: 'JK', a: 'osaka', b: 'kyoto', m: 29 }, { taxi: '5–10' }], note: ['JR 新快速到京都站，計程車回 Hyatt', 'JR Special Rapid to Kyoto Station, then taxi to Hyatt'] }
      ]
    },
    '2026-11-28': {
      city: 'kyoto',
      end: 'kix',
      tab: ['回程', 'Going home'],
      title: ['京都車站搭 HARUKA 到關西機場', 'HARUKA from Kyoto Station to Kansai Airport'],
      legs: [
        { to: 'kix', s: [{ taxi: 0 }, { l: 'HA', a: 'kyoto', b: 'kansai-airport', m: '80', dep: '10:00', arr: '11:21' }], note: ['主方案 HARUKA 17 號 10:00 → 11:21；停駛改八条口機場巴士。GK55 14:55 關西 T1', 'Plan A: HARUKA 17 at 10:00 → 11:21; if suspended, Hachijo airport bus. GK55 14:55 from Kansai T1'] }
      ]
    }
  }
};
