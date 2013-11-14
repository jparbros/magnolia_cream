Magnolias = {}

Magnolias.Quiz = {
  $$$: {},
  generalInformationCompleted: false,
  currentStep: 'q1',
  
  init: function() {
    $('input:checked').removeAttr('checked');
    this.cacheElements();
    this.bindElements();
  },
  
  cacheElements: function() {
    this.$$$.question1 = $(".questions-container #question-1");
    this.$$$.question2 = $(".questions-container #question-2");
    this.$$$.question3 = $(".questions-container #question-3");
    this.$$$.question4 = $(".questions-container #question-4");
    this.$$$.results = $("div#results");
    this.$$$.nameInput = $(".general-information input[name=name]");
    this.$$$.initialsInput = $(".general-information input[name=initials]");
    this.$$$.genreInput = $(".general-information input[name=genre]");
    this.$$$.ageInput = $(".general-information input[name=age]");
    this.$$$.nextBtn = $("a#next-btn");
    this.$$$.resultsHeader = this.$$$.results.find('h1');
    this.$$$.baseImage = this.$$$.results.find("img#base-image");
    this.$$$.powerBlendImage = this.$$$.results.find("img#power-blend-image");
    this.$$$.toppingImage = this.$$$.results.find("img#topping-image");
    this.$$$.flavorImage = this.$$$.results.find("img#flavor-image");
    this.$$$.quiz = $("div#quiz");
    this.$$$.propertyValueIds = this.$$$.results.find("input#cart_item_property_value_ids");
    this.$$$.creamName = this.$$$.results.find("input#cart_item_cream_name");
  },
  
  bindElements: function() {
    that = this;
    this.$$$.genreInput.change(function() {
      that.$$$.genreChecked = $(".general-information input[name=genre]:checked");
      that.changeGeneralInformation();
    });

    this.$$$.ageInput.change(function() {
      that.$$$.ageChecked = $(".general-information input[name=age]:checked");
      that.changeGeneralInformation();
    })
    
    this.$$$.initialsInput.change(function() {that.changeGeneralInformation()});
    
    this.$$$.nameInput.change(function() {that.changeGeneralInformation()});

    $(document).on("generalInformationChange", function() {
      that.$$$.question1.removeClass("disabled");
      that.$$$.nextBtn.removeClass("disabled");
    });
    
    this.$$$.nextBtn.click(this.nextStep)
  },
  
  changeGeneralInformation: function() {
    this.generalInformationCompleted = this.$$$.nameInput.val() != "" && this.$$$.initialsInput.val() != "" && this.$$$.ageChecked != undefined && this.$$$.genreChecked != undefined
    if(this.generalInformationCompleted == true) {
      $(document).trigger("generalInformationChange")
    }
  },
  
  nextStep: function(event) {
    event.preventDefault();
    if(Magnolias.Quiz.canGoToNext() == true) {
      Magnolias.Quiz.transitionSelection();
      Magnolias.Quiz.markNextStep();
    } else {
      Magnolias.Quiz.requiredBox().show('500').delay("1000").hide('500')
    }
  },
  
  markNextStep: function() {
    switch(Magnolias.Quiz.currentStep) {
      case 'q1':
        Magnolias.Quiz.currentStep = 'q2'
        break;
      case 'q2':
        Magnolias.Quiz.currentStep = 'q3'
        break;
      case 'q3':
        Magnolias.Quiz.currentStep = 'q4'
        break;
      case 'q4':
        Magnolias.Quiz.currentStep = 'results'
        break;
    }
  },
  
  transitionSelection: function() {
    switch(Magnolias.Quiz.currentStep) {
      case 'q1':
        Magnolias.Quiz.$$$.question1.hide('slow');
        Magnolias.Quiz.$$$.question2.show('slow');
        break;
      case 'q2':
        Magnolias.Quiz.$$$.question2.hide('slow');
        Magnolias.Quiz.$$$.question3.show('slow');
        break;
      case 'q3':
        Magnolias.Quiz.$$$.question3.hide('slow');
        Magnolias.Quiz.$$$.question4.show('slow');
        break;
      case 'q4':
        Magnolias.Quiz.processQuiz();
        Magnolias.Quiz.$$$.quiz.hide('slow');
        Magnolias.Quiz.$$$.results.show('slow');
        break;
    }
  },
  
  canGoToNext: function() {
    switch(Magnolias.Quiz.currentStep) {
      case 'q1':
        return Magnolias.Quiz.actualBox().find(":checked").length > 0
        break;
      case 'q2':
        return Magnolias.Quiz.actualBox().find(":checked").length > 0
        break;
      case 'q3':
        return Magnolias.Quiz.actualBox().find(":checked").length > 0
        break;
      case 'q4':
        return Magnolias.Quiz.actualBox().find(":checked").length > 0
        break;
    }
  },
  
  requiredBox: function() {
    return Magnolias.Quiz.actualBox().find(".required");
  },
  
  actualBox: function() {
    switch(Magnolias.Quiz.currentStep) {
      case 'q1':
        return Magnolias.Quiz.$$$.question1
        break;
      case 'q2':
        return Magnolias.Quiz.$$$.question2
        break;
      case 'q3':
        return Magnolias.Quiz.$$$.question3
        break;
      case 'q4':
        return Magnolias.Quiz.$$$.question4
        break;
    }
  },
  
  processQuiz: function() {
    Magnolias.Quiz.changeName();
    Magnolias.Quiz.changeSelectedIngredients();
    Magnolias.Quiz.setSelectValues();
    Magnolias.Quiz.setCreamName();
  },
  
  changeName: function() {
    var content = Magnolias.Quiz.$$$.resultsHeader.html().replace("%name%", Magnolias.Quiz.$$$.nameInput.val());
    Magnolias.Quiz.$$$.resultsHeader.html(content)
  },
  
  changeSelectedIngredients: function() {
    var baseImage = "/assets/steps/" + Magnolias.Quiz.baseImage().data("name") + ".png";
    var powerBlendImage = "/assets/steps/" + Magnolias.Quiz.$$$.question2.find(":checked").data("name") + ".png";
    var toppingImage = "/assets/steps/" + Magnolias.Quiz.$$$.question3.find(":checked").data("name") + ".png";
    var flavorImage = "/assets/steps/" + Magnolias.Quiz.$$$.question4.find(":checked").data("name") + ".png";
    Magnolias.Quiz.$$$.baseImage.attr("src", baseImage);
    Magnolias.Quiz.$$$.powerBlendImage.attr("src", powerBlendImage);
    Magnolias.Quiz.$$$.toppingImage.attr("src", toppingImage);
    Magnolias.Quiz.$$$.flavorImage.attr("src", flavorImage);
  },
  
  baseImage: function() {
    var base;
    Magnolias.Quiz.$$$.question1.find(":checked").each(function(index, baseSelected) {
      var object = $(baseSelected);
      if(object.val() == "4") {
        base = object;
        return false;
      } else {
        base = object;
      }
    });
    return base;
  },
  
  setSelectValues: function() {
    var selectedValues = [];
    selectedValues.push(Magnolias.Quiz.baseImage().val());
    selectedValues.push(Magnolias.Quiz.$$$.question2.find(":checked").val());
    selectedValues.push(Magnolias.Quiz.$$$.question3.find(":checked").val());
    selectedValues.push(Magnolias.Quiz.$$$.question4.find(":checked").val());
    Magnolias.Quiz.$$$.propertyValueIds.val(selectedValues.join(','));
  },
  
  setCreamName: function() {
    Magnolias.Quiz.$$$.creamName.val(Magnolias.Quiz.$$$.nameInput.val())
  }
}