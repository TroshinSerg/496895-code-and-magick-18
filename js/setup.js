'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_COUNT = 4;
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;

var fragment = document.createDocumentFragment();
var USER_DIALOG = document.querySelector('.setup');
var SETUP_SIMILAR = document.querySelector('.setup-similar');
var SIMILAR_LIST = document.querySelector('.setup-similar-list');
var SIMILAR_WIZARD_ITEM = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var SETUP_OPEN_BTN = document.querySelector('.setup-open');
var SETUP_CLOSE_BTN = USER_DIALOG.querySelector('.setup-close');
var INPUT_SETUP_USER_NAME = USER_DIALOG.querySelector('.setup-user-name');

var SETUP_COAT = {
  part: USER_DIALOG.querySelector('.setup-wizard .wizard-coat'),
  input: USER_DIALOG.querySelector('[name="coat-color"]'),
  property: 'fill: '
};

var SETUP_EYES = {
  part: USER_DIALOG.querySelector('.setup-wizard .wizard-eyes'),
  input: USER_DIALOG.querySelector('[name="eyes-color"]'),
  property: 'fill: '
};

var SETUP_FIREBALL = {
  part: USER_DIALOG.querySelector('.setup-fireball-wrap'),
  input: USER_DIALOG.querySelector('.setup-fireball-wrap input'),
  property: 'background-color: '
};

var getRandomElement = function (array, remove) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return (remove) ? array.splice(randomIndex, 1).toString() : array[randomIndex];
};

var getWizards = function (count, names, surnames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < count; i++) {
    wizards.push({
      name: getRandomElement(names) + ' ' + getRandomElement(surnames),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    });
  }
  return wizards;
};

var createsSimilarWizards = function (count, names, surnames, coatColors, eyesColors) {
  var wizards = getWizards(count, names, surnames, coatColors, eyesColors);

  for (var i = 0; i < count; i++) {
    var newWizardItem = SIMILAR_WIZARD_ITEM.cloneNode(true);
    newWizardItem.querySelector('.setup-similar-label').textContent = wizards[i].name;
    newWizardItem.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    newWizardItem.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(newWizardItem);
  }

  SIMILAR_LIST.appendChild(fragment);
};

var changeWizardColor = function (obj, colors) {
  var randomColor = getRandomElement(colors);
  obj.part.style = obj.property + randomColor;
  obj.input.value = randomColor;
};

var onWizardsEyesClick = function () {
  changeWizardColor(SETUP_EYES, WIZARDS_EYES_COLORS);
};

var onWizardsCoatClick = function () {
  changeWizardColor(SETUP_COAT, WIZARDS_COAT_COLORS);
};

var onWizardsFireballClick = function () {
  changeWizardColor(SETUP_FIREBALL, WIZARDS_FIREBALL_COLORS);
};

SETUP_FIREBALL.part.addEventListener('click', onWizardsFireballClick);
SETUP_COAT.part.addEventListener('click', onWizardsCoatClick);
SETUP_EYES.part.addEventListener('click', onWizardsEyesClick);

var onSetupEscPress = function (evt) {
  if (evt.keyCode === KEYCODE_ESC && INPUT_SETUP_USER_NAME !== document.activeElement) {
    closeUSER_DIALOG();
  }
};

var openUSER_DIALOG = function () {
  USER_DIALOG.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeUSER_DIALOG = function () {
  USER_DIALOG.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

SETUP_OPEN_BTN.addEventListener('click', function () {
  openUSER_DIALOG();
});

SETUP_CLOSE_BTN.addEventListener('click', function () {
  closeUSER_DIALOG();
});

SETUP_OPEN_BTN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER || evt.keyCode === KEYCODE_SPACE) {
    openUSER_DIALOG();
  }
});

SETUP_CLOSE_BTN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER || evt.keyCode === KEYCODE_SPACE) {
    closeUSER_DIALOG();
  }
});

SETUP_SIMILAR.classList.remove('hidden');
createsSimilarWizards(WIZARDS_COUNT, WIZARDS_NAMES, WIZARDS_SURNAMES, WIZARDS_COAT_COLORS, WIZARDS_EYES_COLORS);
