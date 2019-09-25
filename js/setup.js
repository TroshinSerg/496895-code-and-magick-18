'use strict';

var WIZARDS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;
var KEYCODE_ESC = 27;
var KEYCODE_ENTER = 13;
var KEYCODE_SPACE = 32;

var fragment = document.createDocumentFragment();
var userDialog = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var similarList = document.querySelector('.setup-similar-list');
var similarWizardItem = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupOpenBtn = document.querySelector('.setup-open');
var setupCloseBtn = userDialog.querySelector('.setup-close');

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  var randomElement = array[randomIndex];
  array.splice(randomIndex, randomIndex + 1);
  return randomElement;
};

var getWizards = function (count, names, surnames, coatColors, eyesColors) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push({
      name: getRandomElement(names) + ' ' + getRandomElement(surnames),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    });
  }
  return arr;
};

var createsSimilarWizards = function (count, names, surnames, coatColors, eyesColors) {
  var wizards = getWizards(count, names, surnames, coatColors, eyesColors);

  for (var i = 0; i < count; i++) {
    var newWizardItem = similarWizardItem.cloneNode(true);
    newWizardItem.querySelector('.setup-similar-label').textContent = wizards[i].name;
    newWizardItem.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
    newWizardItem.querySelector('.wizard-eyes').style.fill = wizards[i].eyesColor;
    fragment.appendChild(newWizardItem);
  }

  similarList.appendChild(fragment);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === KEYCODE_ESC) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

setupOpenBtn.addEventListener('click', function () {
  openUserDialog();
});

setupCloseBtn.addEventListener('click', function () {
  closeUserDialog();
});

setupOpenBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER || evt.keyCode === KEYCODE_SPACE) {
    openUserDialog();
  }
});

setupCloseBtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KEYCODE_ENTER || evt.keyCode === KEYCODE_SPACE) {
    closeUserDialog();
  }
});

setupSimilar.classList.remove('hidden');
createsSimilarWizards(WIZARDS_COUNT, WIZARDS_NAMES, WIZARDS_SURNAMES, WIZARDS_COAT_COLORS, WIZARDS_EYES_COLORS);
