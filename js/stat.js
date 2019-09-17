'use strict';

var CLOUD = {
  x: 100,
  y: 10,
  width: 420,
  height: 270,
  paddingY: 35,
  paddingX: 20,
  offset: 10,
  fill: 'rgba(255, 255, 255, 1)',
  shadowFill: 'rgba(0, 0, 0, 0.7)'
};
var WIN_MESSAGE = 'Ура вы победили!\nСписок результатов:';
var TEXT_OPTION = '16px PT Mono';
var TEXT_BASELINE = 'bottom';
var TEXT_GAP = 20;
var TEXT_FILL = 'rgba(0, 0, 0, 1)';
var BAR_GRAPH_HEIGHT = 150;
var BAR_GRAPH_X = 140;
var BAR_GRAPH_Y = 95;
var COL_WIDTH = 40;
var COL_GAP = 50;
var PLAYER_COL_FILL = 'rgba(255, 0, 0, 1)';
var SECOND_COL_FILL_HSL = 'hsl(240, 100%, 50%)';

var getRandomFill = function (hsl) {
  var hslValues = hsl.split(',');
  return hslValues[0] + ', ' + Math.floor(Math.random() * 100) + '%,' + hslValues[2];
};

var drawRect = function (ctx, x, y, width, height, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
};

var drawText = function (ctx, text, x, y) {
  ctx.font = TEXT_OPTION;
  ctx.textBaseline = TEXT_BASELINE;
  ctx.fillStyle = TEXT_FILL;
  var strings = text.split('\n');
  var stringGap = 0;

  for (var i = 0; i < strings.length; i++) {
    ctx.fillText(strings[i], x, y + stringGap);
    stringGap += TEXT_GAP;
  }
};

var drawBars = function (ctx, names, times) {
  times = times.map(Math.round);
  var maxHeight = Math.max.apply(null, times);
  var colHeights = [];
  for (var i = 0; i < names.length; i++) {
    colHeights[i] = times[i] * BAR_GRAPH_HEIGHT / maxHeight;
    var colShift = BAR_GRAPH_X + (COL_WIDTH + COL_GAP) * i;
    drawRect(ctx, colShift, BAR_GRAPH_Y + (BAR_GRAPH_HEIGHT - colHeights[i]), COL_WIDTH, colHeights[i], names[i] === 'Вы' ? PLAYER_COL_FILL : getRandomFill(SECOND_COL_FILL_HSL));
    drawText(ctx, times[i].toString(), colShift, BAR_GRAPH_Y + (BAR_GRAPH_HEIGHT - colHeights[i]) - TEXT_GAP / 2.5);
    drawText(ctx, names[i], colShift, BAR_GRAPH_Y + BAR_GRAPH_HEIGHT + TEXT_GAP);
  }
};

window.renderStatistics = function (ctx, names, times) {
  drawRect(ctx, CLOUD.offset + CLOUD.x, CLOUD.offset + CLOUD.y, CLOUD.width, CLOUD.height, CLOUD.shadowFill);
  drawRect(ctx, CLOUD.x, CLOUD.y, CLOUD.width, CLOUD.height, CLOUD.fill);
  drawText(ctx, WIN_MESSAGE, CLOUD.x + CLOUD.paddingX, CLOUD.y + CLOUD.paddingY);
  drawBars(ctx, names, times);
};
