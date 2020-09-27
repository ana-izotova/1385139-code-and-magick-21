'use strict';

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  COLOUR: `#fff`,
  SHADOW_COLOUR: `rgba(0, 0, 0, 0.7)`,
  INNER_GAP: 20
};

const SHADOW_GAP = 10;

const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`,
  LINE_HEIGHT: 22,
  TEXT_COLOUR: `#000`
};

const Histogram = {
  HORIZONTAL_GAP: 50,
  Y: Cloud.Y + Cloud.INNER_GAP + Font.LINE_HEIGHT * 2 + Cloud.INNER_GAP,
  X: Cloud.X + 40,
  WIDTH: 40,
  HEIGHT: 150 - Cloud.INNER_GAP,
  MAIN_COLUMN_COLOUR: `rgba(255, 0, 0, 1)`,
  OTHERS_COLOUR: `235`
};

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = (ctx, names, times) => {
  renderCloud(
      ctx,
      Cloud.X + SHADOW_GAP,
      Cloud.Y + SHADOW_GAP,
      Cloud.SHADOW_COLOUR
  );
  renderCloud(
      ctx,
      Cloud.X,
      Cloud.Y,
      Cloud.COLOUR
  );

  ctx.fillStyle = Font.TEXT_COLOUR;
  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(
      `Ура вы победили!`,
      Cloud.X + Cloud.INNER_GAP,
      Cloud.Y + Cloud.INNER_GAP
  );
  ctx.fillText(
      `Список результатов:`,
      Cloud.X + Cloud.INNER_GAP,
      Cloud.Y + Cloud.INNER_GAP + Font.LINE_HEIGHT
  );

  let maxTime = getMaxElement(times);

  for (let i = 0; i < names.length; i += 1) {
    const roundedTime = Math.round(Number(times[i]));
    const shiftX = (Histogram.WIDTH + Histogram.HORIZONTAL_GAP) * i;
    const coordinateX = shiftX + Histogram.X;
    const barHeight = (Histogram.HEIGHT * times[i]) / maxTime;

    // ctx.save();
    // ctx.translate(0, Histogram.HEIGHT);
    // ctx.rotate(-Math.PI / 2);

    ctx.fillStyle = Font.TEXT_COLOUR;
    ctx.fillText(
        roundedTime.toString(),
        coordinateX,
        Histogram.Y
    );
    const saturation = getRandomIntInclusive(30, 80);
    const lightness = getRandomIntInclusive(30, 80);
    ctx.fillStyle = `hsl(${Histogram.OTHERS_COLOUR}, ${saturation}%, ${lightness}%)`;
    if (names[i] === `Вы`) {
      ctx.fillStyle = Histogram.MAIN_COLUMN_COLOUR;
    }
    ctx.fillRect(
        coordinateX,
        Histogram.Y + Font.LINE_HEIGHT,
        Histogram.WIDTH,
        barHeight
    );

    ctx.fillStyle = Font.TEXT_COLOUR;
    ctx.fillText(
        names[i],
        coordinateX,
        Cloud.Y + Cloud.HEIGHT - Cloud.INNER_GAP - SHADOW_GAP
    );
  }
};
