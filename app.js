// initiliaze instantsearch
const searchClient = algoliasearch(
  "latency",
  "b37781ea260eea196da5b3346d5ff4c9"
);

const search = instantsearch({
  indexName: "instant_search",
  searchClient
});

// add search widgets
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#searchbox",
    placeholder: "Search for something magical"
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    templates: {
      item: data => `
      <image src="${data.image}"/>
      <div>
        <div class="hit-title">
          <h4>${instantsearch.highlight({ attribute: "name", hit: data })}</h4>
          <div class="price">${data.price}</div>
        </div>
          <p>${instantsearch.highlight({
            attribute: "description",
            hit: data
          })}</p>
      </div>
      `,
      empty: `<h1> Nada.. Please consider another Search...</h1>`
    }
  })
);

search.addWidget(
  instantsearch.widgets.refinementList({
    container: "#brands",
    attribute: "brand",
    searchable: true,
    searchablePlaceholder: "Search for Brands",
    sortBy: ["isRefinded", "name:asc", "count:desc"]
  })
);

search.addWidget(
  instantsearch.widgets.hierarchicalMenu({
    container: "#categories",
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2"
    ]
  })
);

search.addWidget(
  instantsearch.widgets.rangeInput({
    container: "#price",
    attribute: "price",
    templates: {
      submitText() {
        return "Filter";
      }
    }
  })
);

search.addWidget(
  instantsearch.widgets.clearRefinements({
    container: "#clear-all"
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);

search.addWidget(
  instantsearch.widgets.stats({
    container: "#stats"
  })
);

search.start();
