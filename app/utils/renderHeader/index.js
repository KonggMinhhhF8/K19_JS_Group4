export function renderHeader({
    type = "product",
    input = false,
    placeholderText,
    showButtons = true,
    buttons = [
        {
           buttonText: "Add product",
           buttonIcon: "fas fa-plus",
           buttonClass: ""
        }
    ],
    titleText,
    title = false,
    innerTitle,
    iconTitle,
    extraOptions = {},
}) {
    const mainContent = document.querySelector(".main-content");
    const container = document.createElement("header");

    if (type === "product") {
        // Search Bar
        if(input) {
            const divSearchBar = document.createElement("div");
            divSearchBar.className = "search-bar";

            const searchInput = document.createElement("input");
            searchInput.type = "text";
            searchInput.id = "searchInput";
            searchInput.placeholder = placeholderText;

            divSearchBar.append(searchInput);
            container.append(divSearchBar)
        }


        // Buttons
        if(buttons.length > 0 && showButtons) {
            const divButton = document.createElement("div");
            divButton.className = "user-actions";

            buttons.forEach(btnConfig => {
                const addBtn = document.createElement("button");
                addBtn.className = btnConfig.buttonClass || "btn-add";

                const icon = document.createElement("i");
                icon.className = btnConfig.buttonIcon;

                const span = document.createElement("span");
                span.innerText = " " + btnConfig.buttonText;

                addBtn.append(icon, span);
                divButton.append(addBtn);

            });
            container.append(divButton);

        }

        // Title
        if(title) {
            const divTitle = document.createElement("div");
            divTitle.className = "user";

            const strongTag = document.createElement("strong");
            strongTag.innerText = innerTitle + " ";

            const iconTag = document.createElement("i");
            iconTag.className = iconTitle;

            divTitle.append(strongTag, iconTag);

            container.append(divTitle);
        }
        
    }

    //Extra Options
    if (type === "report") {
        // Title
        const title = document.createElement("h2");
        title.innerText = titleText || "";

        const filterGroup = document.createElement("div");
        filterGroup.className = extraOptions.filterClass;

        if (extraOptions.dateStart || extraOptions.dateEnd) {
            const dateStart = document.createElement("input");
            dateStart.type = "date";
            if (extraOptions.dateStart)
                dateStart.value = extraOptions.dateStart;

            const dateEnd = document.createElement("input");
            dateEnd.type = "date";
            if (extraOptions.dateEnd) dateEnd.value = extraOptions.dateEnd;

            filterGroup.append(dateStart, dateEnd);
        }

        // Nút lọc
        const filterBtn = document.createElement("button");
        filterBtn.innerText = extraOptions.filterText;
        filterGroup.append(filterBtn);
        container.append(title, filterGroup);
    }

    return container;
}
