import React from "react"
import { useTranslation } from "react-i18next"

export default function SyllableStressPage() {
  const { t, i18n } = useTranslation("stress")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"

  return (
    <div className="page">
      <div style={styles.container}>
        <h1 style={styles.title}>{t("h1Title")}</h1>

        {/* GENERAL RULES */}
        <section>
          <h2>{t("h2GeneralRules")}</h2>
          <p>{t("pGeneralRules")}</p>
        </section>

        {/* 2 SYLLABLE VERBS */}
        <section>
          <h2>{t("h2TwoSyllableVerbs")}</h2>

          <h3>{t("h3CommonPattern")}</h3>
          <ul>
            <li>reLAX, beGIN, aRRIVE, deCIDE</li>
          </ul>

          <h3>{t("h3Origin")}</h3>
          <div style={styles.grid}>
            <Card title={t("h4FrenchLatin")}>
              <ul>
                <li>reTURN</li>
                <li>preFER</li>
                <li>exPLAIN</li>
                <li>diSCUSS</li>
              </ul>
            </Card>

            <Card title={t("h4Germanic")}>
              <ul>
                <li>ˈO-pen</li>
                <li>ˈEN-ter</li>
                <li>ˈAN-swer</li>
                <li>ˈFO-llow</li>
                <li>ˈHA-ppen</li>
                <li>ˈO-ffer</li>
                <li>ˈBO-rrow</li>
                <li>ˈAR-gue</li>
                <li>ˈFO-cus</li>
                <li>ˈOR-der</li>
                <li>ˈLI-mit</li>
                <li>ˈTAR-get</li>
              </ul>
            </Card>
          </div>

          <h3>{t("h3Practice")}</h3>
          <div style={styles.highlight}>
            <div class="example">
              <p>I would like to ARGue that this solution is better.</p>
              <p>We should FOcus on the main problem.</p>
              <p>This often HAppens in society.</p>
              <p>The policy does not OFfer enough support.</p>
              <p>I will preSENT three main ideas.</p>
            </div>
          </div>
        </section>

        {/* 2 SYLLABLE WORDS */}
        <section>
          <h2>{t("h2TwoSyllableWords")}</h2>
          <p>{t("pRuleFirstStress")}</p>
          <p style={styles.warning}>{t("pWarningSecondStress")}</p>

          <h3>{t("h3FirstSyllable")}</h3>
          <ul>
            <li>HAPpy, EAsy, CLEver, QUIet</li>
            <li>BORing, MODern, BUSy</li>
            <li>HONest, PERfect</li>
          </ul>

          <h3>{t("h3SecondSyllable")}</h3>
          <ul>
            <li>aLONE, aLIVE, aFRAID, aWAKE</li>
            <li>aSHAMED, aMAZING</li>
            <li>diRECT, corRECT, comPLETE</li>
            <li>preCISE, poLITE</li>
          </ul>

          <h3>{t("h3Exceptions")}</h3>
          <ul>
            <li>hoTEL</li>
            <li>poLICE</li>
            <li>caFE</li>
          </ul>
        </section>

        {/* STRESS CHANGE */}
        <section>
          <h2>{t("h2StressChange")}</h2>

          <div style={styles.grid}>
            <Card title={t("h4Noun")}>
              <p>REcord, PREsent, EXport, IMport, CONtract</p>
            </Card>

            <Card title={t("h4Verb")}>
              <p>reCORD, preSENT, exPORT, imPORT, conTRACT</p>
            </Card>
          </div>

          <p>
            <strong>{t("pCommentNote")}</strong>
          </p>
        </section>

        {/* 3 SYLLABLE */}
        <section>
          <h2>{t("h2ThreeSyllable")}</h2>

          <ul>
            <li>TAbletop, CItizen, ENergy, POLitics</li>
            <li>reMEMber, deVELop, conSIDer, reTURNing</li>
          </ul>

          <h3>{t("h3Endings")}</h3>
          <p>{t("pEndingsRule")}</p>

          <ul>
            <li>eduCAtion, deCIsion, revoLUtion</li>
            <li>ecoNOmic, geoGRAphic, draMAtic</li>
            <li>aBIlity, possiBIlity, elecTRIcity</li>
          </ul>
        </section>

        {/* VOWEL REDUCTION */}
        <section>
          <h2>{t("h2VowelReduction")}</h2>
          <p>{t("pSchwa")}</p>

          <ul>
            <li>important → /ɪmˈpɔːtənt/</li>
            <li>political → /pəˈlɪtɪkəl/</li>
            <li>consider → /kənˈsɪdə/</li>
            <li>develop → /dɪˈveləp/</li>
          </ul>
        </section>

        {/* BRITISH VS AMERICAN */}
        <section>
          <h2>{t("h2BritishVsAmerican")}</h2>

          <div style={styles.grid}>
            <Card title={t("h4British")}>
              <p>{t("pBritishDesc")}</p>
              <ul>
                <li>/ˈɪntrəstɪŋ/</li>
                <li>/ˈdɪfrənt/</li>
                <li>/ˈtʃɒklət/</li>
                <li>adVERtisement</li>
              </ul>
            </Card>

            <Card title={t("h4American")}>
              <p>{t("pAmericanDesc")}</p>
              <ul>
                <li>/ˈɪntəˌrɛstɪŋ/</li>
                <li>/ˈdɪfərɛnt/</li>
                <li>/ˈtʃɔːkəlɪt/</li>
                <li>ADvertisement</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* TABLE */}
        <StressTable t={t} />
      </div>
    </div>
  )
}

/* ---------- TABLE COMPONENT ---------- */

function StressTable({ t }) {
  const data = [
    [
      "CHARacter /ˈkærəktə/",
      "eVOLVE /ɪˈvɒlv/",
      "repreSENTative /ˌreprɪˈzentətɪv/",
    ],
    [
      "CRIticism /ˈkrɪtɪsɪzəm/",
      "beGINning /bɪˈɡɪnɪŋ/",
      "correSPONdence /ˌkɒrəˈspɒndəns/",
    ],
    [
      "INcrease (n) /ˈɪnkriːs/",
      "conSIDered /kənˈsɪdəd/",
      "euroPEan /ˌjʊərəˈpiːən/",
    ],
    [
      "LEGendary /ˈledʒəndəri/",
      "deTERmine /dɪˈtɜːmɪn/",
      "introDUCE /ˌɪntrəˈdjuːs/",
    ],
    [
      "MECHanism /ˈmekənɪzəm/",
      "howEVer /haʊˈevə/",
      "paraDOXical /ˌpærəˈdɒksɪkəl/",
    ],
    [
      "NARrative /ˈnærətɪv/",
      "maTErialism /məˈtɪəriəlɪzəm/",
      "coloniSAtion /ˌkɒlənaɪˈzeɪʃən/",
    ],
    [
      "QUAlity /ˈkwɒləti/",
      "reSPECT /rɪˈspekt/",
      "civiliSAtion /ˌsɪvəlaɪˈzeɪʃən/",
    ],
    ["SYMbol /ˈsɪmbəl/", "whereAS /weərˈæz/", "imagiNAtion /ɪˌmædʒɪˈneɪʃən/"],
    ["IMage /ˈɪmɪdʒ/", "abSURD /əbˈsɜːd/", "introDUCtion /ˌɪntrəˈdʌkʃən/"],
    [
      "POPular /ˈpɒpjʊlə/",
      "anTAGonism /ænˈtæɡənɪzəm/",
      "conCLUsion /kənˈkluːʒən/",
    ],
    [
      "OPtimism /ˈɒptɪmɪzəm/",
      "imPErialism /ɪmˈpɪəriəlɪzəm/",
      "comPARison /kəmˈpærɪsən/",
    ],
    [
      "DOCument /ˈdɒkjʊmənt/",
      "coLONialism /kəˈləʊniəlɪzəm/",
      "deSCRIPtion /dɪˈskrɪpʃən/",
    ],
    [
      "PARagraph /ˈpærəɡrɑːf/",
      "conSERvatism /kənˈsɜːvətɪzəm/",
      "repreSENT /ˌreprɪˈzent/",
    ],
    ["SUMmary /ˈsʌməri/", "aNALysis /əˈnæləsɪs/", "disaGREE /ˌdɪsəˈɡriː/"],
    ["FOcus /ˈfəʊkəs/", "", ""],
    ["GOVernment /ˈɡʌvənmənt/", "", ""],
    ["SUMmarise /ˈsʌməraɪz/", "", ""],
    ["EMphasise /ˈemfəsaɪz/", "", ""],
    ["PRObably /ˈprɒbəbli/", "", ""],
    ["NEcessary /ˈnesəsəri/", "", ""],
  ]

  return (
    <section>
      <h2>{t("h2StressTable")}</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>{t("thFirst")}</th>
            <th style={styles.th}>{t("thSecond")}</th>
            <th style={styles.th}>{t("thThird")}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td style={styles.td}>{row[0]}</td>
              <td style={styles.td}>{row[1]}</td>
              <td style={styles.td}>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

/* ---------- UI ---------- */

function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      {children}
    </div>
  )
}

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "20px",

  },
  title: {
    borderBottom: "2px solid #ddd",
    paddingBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
    margin: "15px 0",
  },
  card: {
    background: "#fafafa",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },
  highlight: {
    background: "#f4f6f7",
    padding: "10px",
    borderLeft: "4px solid #3498db",
    margin: "15px 0",
  },
  warning: {
    color: "#c0392b",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "10px",
    textAlign: "left",
    background: "#f4f6f7",
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },
}
