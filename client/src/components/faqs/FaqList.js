import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";



function FaqList() {
    const [items, setItems] = useState([]);
    const { i18n } = useTranslation();
    const lang = i18n.language.startsWith("fr") ? "fr" : "en";
    const localizedText = (field) => {
        if (typeof field === "string") return field;
        return field?.[lang] || field?.en || field?.fr || "";
    };

    useEffect(() => {
        fetchItems();
    }, []);
    
    const fetchItems = async () => {
        const userData = await fetch(`/api/faqs/`);
        const items = await userData.json();
        setItems(items);

    };



    return (
        <section>
             <dl key={0}>
                {
                    items.map((faq, i)=> {
                        const question = localizedText(faq.question);
                        const answer = localizedText(faq.answer);

                        return (

                                    
                            <div key={faq._id}><dt key={i+"dt"}>{question}</dt><dd key={i+"dd"}>{answer}</dd></div> 
           
                                
                        );

                    })
                }
           </dl>
        </section>
    );
}

export default FaqList
