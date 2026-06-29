export function renderStats({
    cardContainer, 
    cards = [],
    
}) {
    const divStats = document.createElement("section");

    for(const card of cards) {
        divStats.className = cardContainer;

        const divCard = document.createElement("div");
        divCard.className = card.cardClass;

        const titleH3 = document.createElement("h3");
        titleH3.innerText = card.cardTitle;

        const price = document.createElement("p");
        price.innerText = card.cardContent;
        if(card.cardContentClass) {
            price.className = card.cardContentClass;
        }

        
        divCard.append(titleH3, price);
        if(card.trend) {
            const divTrend = document.createElement("div");
            divTrend.className = "trend";
            divTrend.classList.add(card.trendStats);

            if (card.trendIcon) {
                const icon = document.createElement("i");
                icon.className = card.trendIcon;
                divTrend.append(icon);  
            }
             if (card.trendText) {
                const span = document.createElement("span");
                span.innerText = " " + card.trendText;
                divTrend.append(span);
            }

            divCard.append(divTrend);
        }
        divStats.append(divCard);
    }

    

    return divStats;
}