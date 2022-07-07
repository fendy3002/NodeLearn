let draw = SVG().addTo('body').size(1200, 600);

let child = draw.nested();

// let rect = draw.rect(100, 100).attr({ fill: '#f06' }).radius(20);
// let circle = draw.circle(100).attr({ fill: '#0f6' });
let text = child.text("Lorem ipsum dolor sit amet consectetur.\nCras sodales imperdiet auctor.")
let text2 = child.text("Lorem ipsum dolor sit amet consectetur.\nCras sodales imperdiet auctor.").move(0, 120)

let childY = 30;
child.move(0, childY);

draw.on('wheel', (evt) => {
  const movePosition = Math.floor(evt.deltaY / 15);
  childY += movePosition;
  child.move(0, childY);
})

// let path = draw.path(`M 40 0
// l 0 20 
// a 16 16 0 1 0 0 22
// l 0 20
// l -40 0
// l 0 -62
// z`).fill("#000");

// path.animate(2000).plot(`M 120 0
// l 0 20 
// a 16 16 0 1 0 0 22
// l 0 20
// l -40 0
// l 0 -62
// z`).loop(true, true);

// path.css('cursor', 'pointer');
// path.click(() => {
//   console.log('path clicked');
// })

let foreignObject = draw.foreignObject(210, 22);
let input = document.createElement('input');
input.style.width = '200px';
input.style.height = '20px';
input.style.margin = '0';
input.style.padding = '0 4px 0 4px';
input.style.border = '1px solid #000';
foreignObject.add(input);
// foreignObject.add(SVG('<input type="text" style="height: 20px; width: 120px; background-color: #000000"/>'));