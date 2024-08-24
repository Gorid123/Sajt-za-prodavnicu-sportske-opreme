const uzmiIndeks = () => {
    const tekst = window.location.href //dobija se url
    const i = tekst.lastIndexOf('=') //ide se od kraja i trazi se indeks karaktera '='
    if (i == -1) return null //ako ga nije nasao onda je i = -1
    return parseInt(tekst.substring(i + 1)) //ako jeste vraca ceo broj od isecenog dela url-a
}

const info = [
    [
        'Prodaju se u paru',
        'Kombinacija visokokvalitetnog neoprena koji se koristi u našim steznicima za kolena sa tanjom unutrašnjom oblogom za lakše postavljanje i slobodno kretanje',
        'Pogodno za treninge i događaje',
        'Dizajniran da umanji rizik od povreda i poveća performanse',
        '5 mm i 7 mm neopren visokog kvaliteta',
        'Ojačana konstrukcija šava kako bi se povećala dugovečnost',
        'Proizvedeno u Velikoj Britaniji'
    ],
    [
        'Prodaje se u paru',
        'Vodeća podrška za zglobove kolena za sportove snage i treninge snage na tržištu, koju koriste dizači svetske klase, dizači tegova i Powerlifteri.',
        'Dizajniran da smanji rizik od povreda i poveća performanse.',
        'Registrovani i patentirani dizajn razvijen u saradnji sa elitnim sportistima, trenerima i zdravstvenim radnicima.',
        'IPF odobren i IVF u skladu sa maksimalno dozvoljenom dužinom od 30 cm.',
        '7 mm neopren visoke klase.',
        'Ojačana konstrukcija šava kako bi se povećala dugovečnost.',
        'Proizvedeno u Velikoj Britaniji.'
    ],
    [
        'Prodaju se u paru',
        'IPF odobren, sa maksimalnom širinom (8 cm) i do maksimalne dužine (1 m)',
        'Široka zaštićena lastika razvijena i proizvedena posebno za potporu zglobu',
        'Petlja za velika opterećenja, posebno proizvedena uz glavnu široku elastiku',
        'Dizajnirano da pruža jednaku potporu levom i desnom zglobu',
        'Dugovečnost i sigurnost su obezbeđeni zahvaljujući najvišim industrijskim standardima',
        'Proizvedeno u Velikoj Britaniji'
    ],
    [
        'Debljina 13 mm i širina 10 cm.',
        'Završna obrada od crne nauljene kože sa unutrašnjošću od crvenog antilopa.',
        'IPF odobren.',
        'Engleska koža pripremana više od pet meseci za snagu i dugovečnost.',
        'Proizvedeno u Velikoj Britaniji.'
    ],
    [
        'Sadrži patentiranu kopču , sa kliznom polugom i podesivošću nazubljenog remena',
        'Engleska koža pripremljena tokom 5 meseci za snagu i dugotrajnost',
        'Crna podmazana kožna završna obrada s crvenim antilopom',
        'IPF Odobren za SBD sa maksimalnom debljinom od 13 mm i širinom od 10 cm',
        'Proizvedeno isključivo odeću'
    ]
]
const proizvodi = [
    {
        n: 1, //br slike
        cena: 8400,
        naziv: 'Steznici za laktove Phantom',
        info_indeks: 0
    },
    {
        n: 2,
        cena: 8400,
        naziv: 'Steznici za laktove Defy Limited',
        info_indeks: 0
    },
    {
        n: 3,
        cena: 7800,
        naziv: 'Steznici za laktove',
        info_indeks: 0
    },
    {
        n: 6,
        cena: 10200,
        naziv: 'Steznici za kolena Phantom',
        info_indeks: 1
    },
    {
        n: 7,
        cena: 10200,
        naziv: 'Steznici za kolena Defy Limited',
        info_indeks: 1
    },
    {
        n: 8,
        cena: 9600,
        naziv: 'Steznici za kolena',
        info_indeks: 1
    },
    {
        n: 9,
        cena: 5600,
        naziv: 'Bandaže za zglobove Phantom',
        info_indeks: 2
    },
    {
        n: 10,
        cena: 5600,
        naziv: 'Bandaže za zglobove Defy',
        info_indeks: 2
    },
    {
        n: 11,
        cena: 5000,
        naziv: 'Bandaže za zglobove 40, 60, 100cm tvrde/meke',
        info_indeks: 2
    },
    {
        n: 4,
        cena: 24600,
        naziv: 'Pojas',
        info_indeks: 3
    },
    {
        n: 5,
        cena: 24600,
        naziv: 'Pojas sa polugom',
        info_indeks: 4
    }
]

const indeks_proizvoda = uzmiIndeks()
const uzmiElement = id => document.getElementById(id) //zbog skracivanja koda

const SelektujProizvod = () => {
    if (indeks_proizvoda == null || Number.isNaN(indeks_proizvoda) || indeks_proizvoda < 0 || indeks_proizvoda >= proizvodi.length) {
        window.open('proizvodi.html', '_self') //vraca se na home ako url nije dobar
        return
    }
    //ubacivanje informacija
    const { n, cena, naziv, info_indeks } = proizvodi[indeks_proizvoda]
    //n je dobijeno na isti nacin kao i n = proizvods[proizvod_index].n
    uzmiElement('proizvod-slika').src = `slike/velike/${n}.jpg`
    uzmiElement('proizvod-naziv').innerText = naziv
    uzmiElement('proizvod-cena').innerText = `${cena} RSD`
    const ul = uzmiElement('proizvod-info')
    info[info_indeks].forEach(text => {
        const li = document.createElement('li')
        const tekst_element = document.createTextNode(text) //mora da se napravi text node; ne moze direktno tekst da se ubaci
        li.appendChild(tekst_element) //text node se ubacuje u li
        ul.appendChild(li) //li se ubacuje u unordered listu
    })
}

SelektujProizvod() //prikazuje proizvod na osnovu indeksa iz url adrese
uzmiElement('proizvod-slika').onclick = function () {
    this.classList.toggle('velika-slika')
}

const ch_identifikatori = ['velicina_s', 'velicina_m', 'velicina_l', 'velicina_xl']
const ch_velicine = ['S', 'M', 'L', 'XL']
const Naruci = () => {
    let velicine = []
    ch_identifikatori.forEach((id, i) => {
        if (uzmiElement(id).checked) velicine.push(ch_velicine[i])
    })
    if (velicine.length == 0) return null
    const tekst = uzmiElement('kvantitet').value
    if (tekst.length == 0) return null
    for (const k of tekst) if (!(k >= '0' && k <= '9')) return null
    let n = parseInt(tekst)
    if (n == 0 || n >= 10000) return null
    let odgovor = `Za isporuku:\n`
    const { naziv, cena } = proizvodi[indeks_proizvoda]
    odgovor += `${naziv} / ${cena} RSD\n`
    velicine.forEach(naziv => {
        odgovor += `${naziv} (${n} kom.) `
    })
    n *= velicine.length
    odgovor += `\nukupno: ${n} kom. / ${n * cena} RSD`
    return odgovor
}

uzmiElement('naruci-dugme').onclick = () => {
    const tekst = Naruci()
    alert(tekst == null ? 'Podaci nisu pravilno uneti' : tekst)
}