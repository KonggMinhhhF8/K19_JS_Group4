export function renderHeader({ 
    type = "product", 
    placeholderText, 
    buttonText, 
    buttonIcon, 
    buttonClass, 
    titleText,
    extraOptions = {},
}) {


    const mainContent = document.querySelector(".main-content");
    const container = document.createElement("header");
    
    if(type === "product") {
        // Search Bar
        const divSearchBar = document.createElement("div");
        divSearchBar.className = "search-bar";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.id = "searchInput";
        searchInput.placeholder = placeholderText;

        divSearchBar.append(searchInput);


        // Button Addition
        const divButton = document.createElement("div");
        divButton.className = "user-actions";

        const addBtn = document.createElement("button");
        addBtn.className = buttonClass || "btn-add";

        const icon = document.createElement("i");
        icon.className = buttonIcon;

        const span = document.createElement("span");
        span.innerText = " " + buttonText;

        addBtn.append(icon, span)

        divButton.append(addBtn)

        // Append
        container.append(divSearchBar, divButton);

    }

    //Extra Options
    if(type === "report") {
        // Title
        const title = document.createElement("h2");
        title.innerText = titleText || "";

        const filterGroup = document.createElement("div");
        filterGroup.className = extraOptions.filterClass;

        if (extraOptions.dateStart || extraOptions.dateEnd) {
            const dateStart = document.createElement("input");
            dateStart.type = "date";
            if (extraOptions.dateStart) dateStart.value = extraOptions.dateStart;

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