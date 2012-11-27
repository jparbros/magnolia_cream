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
    Magnolias.crema.markNextSteps();
  },
  
  cacheElements: function() {
    this.$$$.startStepsButton = $('#start-steps');
    this.$$$.nextStepButton = $('#next-steps');
    this.$$$.instruccionsContainer = $('#instruccions');
    this.$$$.baseContainer = $('#base');
    this.$$$.funcionPrimariaContainer = $('#funcion-primaria');
    this.$$$.extraContainer = $('#extra');
    this.$$$.saborContainer = $('#sabor');
    this.$$$.animacionContainer = $('#animacion');
    this.$$$.stepsContainer = $('.steps');
    this.$$$.propertiesLinks = $('.properties a');
    this.$$$.fill = $('#fill');
    this.$$$.checkoutButton = $('#checkout');
  },
  
  bindElements: function() {
    this.$$$.startStepsButton.live('click', this.startSteps);
    this.$$$.nextStepButton.live('click', this.nextStep);
    this.$$$.propertiesLinks.live('click', this.selectProperty);
    this.$$$.checkoutButton.live('click', this.submitForm)
  },
  
  startSteps: function() {
    $('.span5').css('min-height','100px');
    Magnolias.crema.$$$.instruccionsContainer.hide(1000);
    Magnolias.crema.$$$.animacionContainer.animate({"margin-top": "0px"}, 1300, 'linear');
    Magnolias.crema.$$$.nextStepButton.html('Siguiente >');
    Magnolias.crema.$$$.baseContainer.show('slow');
    Magnolias.crema.stepsSign();
    Magnolias.crema.markNextSteps();
  },
  
  nextStep: function(event) {
    event.preventDefault();
    if (Magnolias.crema.currentStep == 'step0')
      Magnolias.crema.startSteps();
    if (Magnolias.crema.canContinue()) {
      Magnolias.crema.stepsSign();
      Magnolias.crema.markNextSteps();
      Magnolias.crema.cleanBox();
      Magnolias.crema.onOffBox();
    }
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
  
  markNextSteps: function() {
    steps = ['step0', 'step1', 'step2', 'step3', 'step4'];
    if (Magnolias.crema.currentStep != '')
      Magnolias.crema.actualStep += 1;
    Magnolias.crema.previousStep = steps[Magnolias.crema.actualStep - 1];
    Magnolias.crema.currentStep = steps[Magnolias.crema.actualStep];
    Magnolias.crema.nextStep = steps[Magnolias.crema.actualStep + 1];
    Magnolias.crema.hideNextButton();
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
    Magnolias.crema.actualBox().find('input:checked').removeAttr('checked');
  },
  
  onOffBox: function () {
    Magnolias.crema.previousBox().hide(1000);
    Magnolias.crema.actualBox().show(1000);
  },
  
  transitionSelection: function() {
    switch(Magnolias.crema.currentStep) {
      case 'step1':
        Magnolias.crema.animateStep('67', '-116', '-199');
        break;
      case 'step2':
        Magnolias.crema.animateStep('134', '-183', '-132');
        break;
      case 'step3':
        Magnolias.crema.animateStep('201', '-250', '-65');
        break;
      case 'step4':
        Magnolias.crema.animateStep('266', '-315', '0');
        break;
    }
  },
  
  animateStep: function(height, top, background_position_y) {
    if(jQuery.browser.webkit || jQuery.browser.safari) {
      Magnolias.crema.$$$.fill.animate({height: height+"px", top: top+"px", "background-position-y":  background_position_y + "px"}, 1500, 'linear');
    }
    else if(jQuery.browser.mozilla) {
      Magnolias.crema.$$$.fill.switchClass(Magnolias.crema.previousStep, Magnolias.crema.currentStep, 1500, 'linear');
      // Magnolias.crema.$$$.fill.animate({height: height + "px", top: top + "px", "background-position": [0, background_position_y]}, 1500, 'linear');
    }
  },
  
  showCheckoutButton: function() {
    if(Magnolias.crema.currentStep == 'step3')
      Magnolias.crema.$$$.checkoutButton.show(1000);
  },
  
  hideNextButton: function() {
    if(Magnolias.crema.currentStep == 'step4')
      Magnolias.crema.$$$.nextStepButton.hide(1000);
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
    $('.checked-cloned').remove();
    checked = $('.checked-icon').clone();
    checked.show().addClass('checked-cloned');
    $(_this).append(checked);
  },
  
  submitForm: function() {
    $('#new_cart_item').submit();
  }
}