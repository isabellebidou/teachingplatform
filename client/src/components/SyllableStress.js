import React from "react"
import { useTranslation } from "react-i18next"

export default function SyllableStressPage() {
  const { t, i18n } = useTranslation("stress")
  const lang = i18n.language.startsWith("fr") ? "fr" : "en"

  return (
    <div className="page">
      <div className="stress_container">
        <h1 className="stress_title">{t("h1Title")}</h1>

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
          <div className="stress_grid">
            <Card title={t("h4FrenchLatin")}>
              <ul>
                <li>reTURN</li>
                <li>preFER</li>
                <li>exPLAIN</li>
                <li>diSCUSS</li>
              </ul>
              <audio controls>
                <source src="/audio/verbs_second.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
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
              <audio controls>
                <source src="/audio/verbs_first.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>

          <h3>{t("h3Practice")}</h3>
          <div className="stress_highlight">
            <div class="example">
              <p>I would like to ARGue that this solution is better.</p>
              <p>We should FOcus on the main problem.</p>
              <p>This often HAppens in society.</p>
              <p>The policy does not OFfer enough support.</p>
              <p>I will preSENT three main ideas.</p>
            </div>
            <audio controls>
              <source src="/audio/practice_sentences.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </section>

        {/* 2 SYLLABLE WORDS */}
        <section>
          <h2>{t("h2TwoSyllableWords")}</h2>
          <p>{t("pRuleFirstStress")}</p>
          <p className="stress_warning">{t("pWarningSecondStress")}</p>

          <div className="stress_grid">
            <Card title={t("h4FirstSyllable")}>
              <ul>
                <li>HAPpy, EAsy, CLEver, QUIet</li>
                <li>BORing, MODern, BUSy</li>
                <li>HONest, PERfect</li>
              </ul>
              <audio controls>
                <source src="/audio/adj_first.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Card>

            <Card title={t("h4SecondSyllable")}>
              <ul>
                <li>aLONE, aLIVE, aFRAID, aWAKE</li>
                <li>aSHAMED, aMAZING</li>
                <li>diRECT, corRECT, comPLETE</li>
                <li>preCISE, poLITE</li>
              </ul>
              <audio controls>
                <source src="/audio/adj_second.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>


          <h3>{t("h3Exceptions")}</h3>
          <ul>
            <li>hoTEL</li>
            <li>poLICE</li>
            <li>caFE</li>
          </ul>

          <audio controls>
            <source src="/audio/adj_exceptions.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </section>

        {/* STRESS CHANGE */}
        <section>
          <h2>{t("h2StressChange")}</h2>

          <div className="stress_grid">
            <Card title={t("h4Noun")}>
              <p>REcord, PREsent, EXport, IMport, CONtract</p>
              <audio controls>
                <source
                  src="/audio/stress_change_nouns.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>

            <Card title={t("h4Verb")}>
              <p>reCORD, preSENT, exPORT, imPORT, conTRACT</p>

              <audio controls>
                <source
                  src="/audio/stress_change_verbs.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>

          <p>
            <strong>{t("pCommentNote")} ˈCOM-ment </strong>
          </p>
        </section>

        {/* 3 SYLLABLE */}
        <section>
          <h2>{t("h2ThreeSyllable")}</h2>
          <p> {t("pThreeSyllables")}</p>

          <div className="stress_grid">
            <Card title={t("h4ThreeSyllableNoun")}>
              <p>TAbletop, CItizen, ENergy, POLitics</p>
                            <audio controls>
                <source
                  src="/audio/three_syllables_nouns.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>

            <Card title={t("h4ThreeSyllableVerb")}>
              <p>reMEMber, deVELop, conSIDer, reTURNing</p>
              <audio controls>
                <source
                  src="/audio/three_syllables_verbs.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>

          <h3>{t("h3Endings")}</h3>
          <p>{t("pEndingsRule")}</p>

          <div className="stress_grid">
            <Card title={t("h4EndingsTion")}>
              <p>eduCAtion, deCIsion, revoLUtion</p>
              <audio controls>
                <source
                  src="/audio/ending_tion.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>

            <Card title={t("h4EndingsTic")}>
              <p>ecoNOmic, geoGRAphic, draMAtic</p>
              <audio controls>
                <source
                  src="/audio/ending_ic.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>

            <Card title={t("h4EndingsIty")}>
              <p>aBIlity, possiBIlity, elecTRIcity</p>
              <audio controls>
                <source
                  src="/audio/ending_ity.mp3"
                  type="audio/mpeg"
                />
                Your browser does not support the audio element.
              </audio>
            </Card>
          </div>
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

          <div className="stress_grid">
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
        <div className="stress_grid">
          <Card title={t("h2StressTable")}>
            <StressTable t={t} />
          </Card>
        </div>
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
      <table className="stress_table">
        <thead>
          <tr>
            <th className="stress_th">{t("thFirst")}</th>
            <th className="stress_th">{t("thSecond")}</th>
            <th className="stress_th">{t("thThird")}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i + "tr"} className={i % 2 === 0 ? "even" : "odd"}>
              <td className="stress_td">{row[0]}</td>
              <td className="stress_td">{row[1]}</td>
              <td className="stress_td">{row[2]}</td>
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
    <div className="stress_card">
      <h4>{title}</h4>
      {children}
    </div>
  )
}
/*
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
  },
  td: {
    padding: "8px",
    borderBottom: "1px solid #eee",
    verticalAlign: "top",
  },
}*/
