import $ from "jquery";
import { addPeopleTable } from "../my_connections/my_connections";
import { shouldInitializeFeature, getFeatureOptions } from "../../core/options/options_storage";

shouldInitializeFeature("categoryTables").then((result) => {
  if (result) {
    import("./category_tables.css");
    addCategoryTableButton();
  }
});

function getPageType() {
  if ($("body.page-Category_Supercentenarians").length) return "superCentenarians";
  if ($("body.page-Category_Centenarians").length) return "centenarians";
  return "category";
}

// Function to get profile count
function getProfileCount() {
  const profileCountText = $("#Persons h2")
    .text()
    .match(/[0-9,]+/)[0];
  return parseInt(profileCountText.replace(/,/g, ""), 10);
}

/*
async function addCategoryTableButton() {
  const personProfilesh2 = $("h2:contains(Person Profiles)");
  personProfilesh2.append($("<button class='small button moreDetailsButton'>Table</button>"));
  $("button.moreDetailsButton").on("click", async function (e) {
    e.preventDefault();
    const superIDs = $("a.P-F,a.P-M")
      .map(function () {
        return $(this).attr("href").split("/wiki/")[1];
      })
      .get();

    const aTableID = getPageType();
    // Split superIDs into groups of 100; Make a table for the first group; Add pagination link for the rest
    const superIDgroups = [];
    let i = 0;
    while (i < superIDs.length) {
      superIDgroups.push(superIDs.slice(i, i + 100));
      i += 100;
    }
    if (superIDgroups.length > 1) {
      const paginationLinks = $("<div id='categoryTablePaginationLinks'></div>");
      paginationLinks.insertAfter($("button.moreDetailsButton"));
    }
    const onlyUnconnected = $("<button id='onlyUnconnected' class='small button'>Only Unconnected</button>");
    onlyUnconnected.appendTo(personProfilesh2);
    onlyUnconnected.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".peopleTable tr").show();
      } else {
        $(this).addClass("active");
        $(".peopleTable tr").hide();
        $(".peopleTable tr[data-connected='0']").show();
      }
    });
    if (superIDgroups.length > 1) {
      const paginationLinks = $("#categoryTablePaginationLinks");
      superIDgroups.forEach(function (anID, index) {
        const aLink = $(`<a class='small moreDetailsNumberButton' data-link="${index}">${index + 1}</a>`);
        aLink.on("click", function (e) {
          e.preventDefault();
          if ($(".peopleTable[data-table-number='" + $(this).data("link") + "']").length) {
            $(".peopleTable[data-table-number='" + $(this).data("link") + "']").show();
            $(".peopleTable:not([data-table-number='" + $(this).data("link") + "'])").hide();
            $(".moreDetailsNumberButton").removeClass("active");
            $(this).addClass("active");
          } else {
            paginationLinks.find("a").removeClass("active");
            $(this).addClass("active");
            addPeopleTable(anID.join(","), aTableID, $("#Persons"), "category");
          }
        });
        paginationLinks.append(aLink);
      });
    }
    // Click button 0 to start
    if ($("#categoryTablePaginationLinks").length) {
      $("#categoryTablePaginationLinks").find("a[data-link='0']").trigger("click").addClass("active");
    } else {
      addPeopleTable(superIDs.join(","), aTableID, $("#Persons"), "category");
    }
  });

  // Add Esc to close family sheet
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      // Find the .familySheet with the highest z-index
      let highestZIndex = 0;
      let lastFamilySheet = null;

      $(".familySheet:visible").each(function () {
        const zIndex = parseInt($(this).css("z-index"), 10);
        if (zIndex > highestZIndex) {
          highestZIndex = zIndex;
          lastFamilySheet = $(this);
        }
      });

      // Close the .familySheet with the highest z-index
      if (lastFamilySheet) {
        lastFamilySheet.fadeOut();
      }
    }
  });
}

*/

async function addCategoryTableButton() {
  const personProfilesh2 = $("h2:contains(Person Profiles)");
  personProfilesh2.append($("<button class='small button moreDetailsButton'>Table</button>"));
  $("button.moreDetailsButton").on("click", async function (e) {
    e.preventDefault();
    const superIDs = $("a.P-F,a.P-M")
      .map(function () {
        return $(this).attr("href").split("/wiki/")[1];
      })
      .get();

    const aTableID = getPageType();

    // If there are more than 200 IDs, you might want to handle that differently
    // For now, let's just take the first 200
    const idsToUse = superIDs.slice(0, 200).join(",");

    // Call addPeopleTable with up to 200 IDs
    addPeopleTable(idsToUse, aTableID, $("#Persons"), "category");

    const onlyUnconnected = $("<button id='onlyUnconnected' class='small button'>Only Unconnected</button>");
    onlyUnconnected.appendTo(personProfilesh2);
    onlyUnconnected.on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
        $(".peopleTable tr").show();
      } else {
        $(this).addClass("active");
        $(".peopleTable tbody tr").hide();
        $(".peopleTable tr[data-connected='0']").show();
      }
    });
  });

  // Add Esc to close family sheet
  $(document).on("keyup", function (e) {
    if (e.key === "Escape") {
      // Find the .familySheet with the highest z-index
      let highestZIndex = 0;
      let lastFamilySheet = null;

      $(".familySheet:visible").each(function () {
        const zIndex = parseInt($(this).css("z-index"), 10);
        if (zIndex > highestZIndex) {
          highestZIndex = zIndex;
          lastFamilySheet = $(this);
        }
      });

      // Close the .familySheet with the highest z-index
      if (lastFamilySheet) {
        lastFamilySheet.fadeOut();
      }
    }
  });
}