import { CDN } from '../config'

export default function ONas() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* Page header */}
      <section
        style={{
          padding: '6rem 2rem 5rem',
          maxWidth: '1280px',
          margin: '0 auto',
          borderBottom: '1px solid #e7e5e4',
        }}
      >
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#a8a29e',
            marginBottom: '1.5rem',
          }}
        >
          Náš příběh
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 200,
            letterSpacing: '-0.02em',
            color: '#1c1917',
            margin: '0',
            lineHeight: 1.1,
            maxWidth: '700px',
          }}
        >
          O nás
        </h1>
      </section>

      {/* 2-column main content */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '6rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'start',
        }}
      >
        {/* Left column — text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Jmenuji se Filip Kopáček a Truhlářstvím za štěstím jsem v myšlenkách začal tvořit již v roce 2021. V té době jsem měl za sebou dva roky v truhlářské dílně, kde jsem se řemeslu začal učit od nuly. Ale pojďme úplně na začátek.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Narodil jsem se v Táboře a vyrůstal v Jihlavě, kde jsem vystudoval ochranu životního prostředí a ekologii. Následně jsem proplouval životem, žil v Praze i v Berlíně, až se v mých 26 letech vše otočilo.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Po mnoha různých pracovních zkušenostech, které jsem do té doby prožil, jsem díky vánočnímu dárku zavítal do truhlářské dílny, abych si na jeden den zkusil práci se dřevem, která mě odjakživa lákala. Po tomto dni mi byla nabídnuta práce a já ji bez váhání přijal. To hlavní ale přišlo o rok později, kdy jsem nastoupil do dílny, ve které jsem strávil dalších pět let. Tam jsem se naučil vše, co truhlařina nabízí, a pochopil, že právě toto řemeslo je to, co jsem v životě hledal.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Chtěl jsem vyrábět nábytek po svém – pečlivěji, kvalitněji a s využitím nových principů. Původní zázemí mi už v mém rozletu nestačilo, a tak jsem se rozhodl jít vlastní cestou.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Vize, kterou jsem nosil v hlavě, se stala skutečností v roce 2024, kdy jsem otevřel vlastní dílnu.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Dnes pod značkou Truhlářstvím za štěstím vyrábíme veškerý vestavný nábytek na míru. Úzce spolupracujeme s architekty a designéry, kteří nám pomáhají porozumět prostoru tak, aby byl výsledný projekt šitý na míru konkrétním lidem i jejich domovu.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Naši práci podtrhuje spolehlivost kování značky Hettich, které se po mnoha zkušenostech stalo pevným standardem všech našich realizací.
          </p>
          <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
            Tvorba nábytku pro váš domov je pro mě srdeční záležitostí a každá realizace je zároveň i dalším krokem v budování mého snu.
          </p>

          <div style={{ marginTop: '1rem', paddingTop: '2rem', borderTop: '1px solid #e7e5e4' }}>
            <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.85 }}>
              Jsem vděčný, že mohu díky vám dělat práci, která mě naplňuje, a společně s vámi vytvářet místa, kam se budete rádi vracet.
            </p>
            <p style={{ fontSize: '1.1rem', fontWeight: 400, color: '#1c1917', marginTop: '1.25rem', fontStyle: 'italic' }}>
              Děkuji vám za důvěru.
            </p>
          </div>
        </div>

        {/* Right column — portrait + belief section */}
        <div>
          <img
            src={`${CDN}/images/filip.jpg`}
            alt="Filip Kopáček"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />

          <div style={{ marginTop: '3rem' }}>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: '#1c1917',
                marginBottom: '1.5rem',
                lineHeight: 1.2,
              }}
            >
              Čemu věřím
            </h2>
            <p style={{ fontSize: '1rem', color: '#57534e', lineHeight: 1.8 }}>
              V dnešní době, kdy je trh přesycen rychlými a levnými řešeními, se vracím k základům. Věřím, že nábytek by neměl být jen spotřebním zbožím, ale součást domova, která stárne s vámi. Moje práce není o tom vyrobit co nejvíce kusů za co nejkratší čas. Je o klidu, důkladnosti a jistotě, že nábytek, který jsem namontoval, bude fungovat hladce i za dvacet let. Moje filozofie je zkrátka jednoduchá: nedělám nic, pod co bych se nebyl ochoten podepsat vlastním jménem.
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
