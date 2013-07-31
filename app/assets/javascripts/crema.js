Magnolias = {}

Magnolias.crema = {
  $$$: {},
  
  currentStep: '',
  
  nextStep: '',
  
  previousStep: '',
  
  actualStep: 0,
  
  init: function() {
    $('input:checked').removeAttr('checked');
    this.cacheElements();
    this.bindElements();
    this.cleanBox();
    Magnolias.crema.markNextSteps();
  },
  
  cacheElements: function() {
    var manager = new jsAnimManager(40);
    this.$$$.startStepsButton = $('#start-steps');
    this.$$$.nextStepButton = $('#next-steps');
    this.$$$.instruccionsContainer = $('#instruccions');
    this.$$$.baseContainer = $('#skin-type');
    this.$$$.funcionPrimariaContainer = $('#power-blend');
    this.$$$.extraContainer = $('#topping');
    this.$$$.saborContainer = $('#flavor');
    this.$$$.animacionContainer = $('#animacion');
    this.$$$.stepsContainer = $('.steps');
    this.$$$.propertiesLinks = $('.properties a');
    this.$$$.fill = $('#fill');
    this.$$$.checkoutButton = $('#checkout');
    this.$$$.backButton = $('#back-step');
    this.$$$.creamNameInput = $('.cream_name_container');
    this.$$$.creamName = $('#cream-name');
  },
  
  bindElements: function() {
    this.$$$.startStepsButton.live('click', this.startSteps);
    this.$$$.nextStepButton.live('click', this.nextStep);
    this.$$$.propertiesLinks.live('click', this.selectProperty);
    this.$$$.checkoutButton.live('click', this.submitForm);
    this.$$$.backButton.live('click', this.backStep);
    this.$$$.creamNameInput.find('input').keyup(this.fillCreamName);
  },
  
  startSteps: function() {
    $('.span5').css('min-height','100px');
    Magnolias.crema.$$$.instruccionsContainer.hide(1000);
    Magnolias.crema.$$$.animacionContainer.animate({"margin-top": "0px", 'margin-bottom': '0'}, 1300, 'linear');
    Magnolias.crema.$$$.nextStepButton.html('Next >');
    Magnolias.crema.$$$.baseContainer.show('slow');
    Magnolias.crema.stepsSign();
    Magnolias.crema.markNextSteps();
  },
  
  nextStep: function(event) {
    event.preventDefault();
    if (Magnolias.crema.currentStep == 'step0')
      Magnolias.crema.startSteps();
    if (Magnolias.crema.canContinue()) {
      Magnolias.crema.$$$.backButton.show('slow');
      Magnolias.crema.stepsSign();
      Magnolias.crema.markNextSteps();
      Magnolias.crema.onOffBox();
    }
  },
  
  backStep: function() {
    Magnolias.crema.actualBox().hide(1000);
    Magnolias.crema.previousBox().show(1000);
    Magnolias.crema.$$$.stepsContainer.removeClass(Magnolias.crema.currentStep).addClass(Magnolias.crema.previousStep);
    Magnolias.crema.markBackSteps();
  },
  
  selectProperty: function(event) {
    event.preventDefault();
    propertyValue = $(this).data('property');
    containerBox = $(this).closest('.properties');
    containerBox.find('input:checked').removeAttr('checked');
    containerBox.find('input#' + propertyValue).attr('checked','checked');
    Magnolias.crema.selectVariant();
    Magnolias.crema.transitionSelection();
    Magnolias.crema.showCheckoutButton();
    Magnolias.crema.checkedItem(this);
  },

  markBackSteps: function() {
    steps = ['step0', 'step1', 'step2', 'step3', 'step4'];
    if (Magnolias.crema.currentStep != '')
      Magnolias.crema.actualStep -= 1;
    Magnolias.crema.previousStep = steps[Magnolias.crema.actualStep - 1];
    Magnolias.crema.currentStep = steps[Magnolias.crema.actualStep];
    Magnolias.crema.nextStep = steps[Magnolias.crema.actualStep + 1];
    Magnolias.crema.hideNextButton();
    Magnolias.crema.hideBackButton();
  },
  
  markNextSteps: function() {
    steps = ['step0', 'step1', 'step2', 'step3', 'step4'];
    if (Magnolias.crema.currentStep != '')
      Magnolias.crema.actualStep += 1;
    Magnolias.crema.previousStep = steps[Magnolias.crema.actualStep - 1];
    Magnolias.crema.currentStep = steps[Magnolias.crema.actualStep];
    Magnolias.crema.nextStep = steps[Magnolias.crema.actualStep + 1];
    Magnolias.crema.hideNextButton();
    Magnolias.crema.hideBackButton();
  },
  
  stepsSign: function() {
    Magnolias.crema.$$$.stepsContainer.removeClass(Magnolias.crema.currentStep).addClass(Magnolias.crema.nextStep);
  },
  
  actualBox: function() {
    switch(Magnolias.crema.currentStep) {
      case 'step1':
        return Magnolias.crema.$$$.baseContainer
        break;
      case 'step2':
        return Magnolias.crema.$$$.funcionPrimariaContainer
        break;
      case 'step3':
        return Magnolias.crema.$$$.extraContainer
        break;
      case 'step4':
        return Magnolias.crema.$$$.saborContainer
        break;
    }
  },
  
  previousBox: function() {
    switch(Magnolias.crema.currentStep) {
      case 'step2':
        return Magnolias.crema.$$$.baseContainer
        break;
      case 'step3':
        return Magnolias.crema.$$$.funcionPrimariaContainer
        break;
      case 'step4':
        return Magnolias.crema.$$$.extraContainer
        break;
    }
  },
  
  canContinue: function() {
    return Magnolias.crema.actualBox().find('input:checked').length == 1
  },
  
  cleanBox: function() {
    $('input:checked').removeAttr('checked');
  },
  
  onOffBox: function () {
    Magnolias.crema.previousBox().hide(1000);
    Magnolias.crema.actualBox().show(1000);
  },
  
  transitionSelection: function() {
    switch(Magnolias.crema.currentStep) {
      case 'step1':
        Magnolias.crema.$$$.fill.removeClass('step0').removeClass('step2').addClass('step1')
        break;
      case 'step2':
        Magnolias.crema.$$$.fill.removeClass('step1').removeClass('step2').addClass('step2')
        break;
      case 'step3':
        Magnolias.crema.$$$.fill.removeClass('step2').removeClass('step4').addClass('step3')
        break;
      case 'step4':
        Magnolias.crema.$$$.fill.removeClass('step3').addClass('step4')
        break;
    }
  },

  showCheckoutButton: function() {
    if(Magnolias.crema.currentStep == 'step4') {
      Magnolias.crema.$$$.checkoutButton.show(1000);
      Magnolias.crema.$$$.creamNameInput.show(1000);
    }
  },
  
  hideNextButton: function() {
    if(Magnolias.crema.currentStep == 'step4')
      Magnolias.crema.$$$.nextStepButton.hide(1000);
    else
      Magnolias.crema.$$$.nextStepButton.show(1000);
  },
  
  hideBackButton: function() {
    if(Magnolias.crema.currentStep == 'step1' || Magnolias.crema.currentStep == 'step0')
      Magnolias.crema.$$$.backButton.hide(1000);
    else
      Magnolias.crema.$$$.backButton.show(1000);
  },
  
  selectVariant: function() {
    switch(Magnolias.crema.currentStep) {
      case 'step3':
        $("input[data-variant-sku=1030]").attr('checked', true);
        break;
      case 'step4':
        $("input[data-variant-sku=1040]").attr('checked', true);
        break;
    }
  },
  
  checkedItem: function(_this) {
    $(_this).closest('.properties').find('.checked').removeClass('checked');
    $(_this).addClass('checked');
  },
  
  submitForm: function() {
    $('#new_cart_item').submit();
  },
  
  fillCreamName: function() {
    input = $(this);
    creamNameValue = input.val();
    if (creamNameValue.length <= 10)
      Magnolias.crema.$$$.creamName.html(creamNameValue);
    else {
      input.val(creamNameValue.split("",10).join(""));
    }
    
  }
}