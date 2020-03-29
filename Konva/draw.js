window.stepProgress = window.stepProgress || {};
window.stepProgress.draw = window.stepProgress.draw || {};

window.stepProgress.draw = function (option) {
    let style = window.stepProgress.style;
    let draw = {
        option: {
            space: 300,
            paddingX: 20,
            paddingY: 10,
            startX: 50,
            ...option
        },
        __: {
            stage: null,
            layer: {
                bg: null,
                phase: null,
                point: null,
            }
        }
    };
    draw.stage = (stage = null) => {
        if (stage) {
            draw.__.stage = stage;
            draw.__.layer = {
                bg: new Konva.Layer(),
                phase: new Konva.Layer(),
                point: new Konva.Layer(),
            };
            for (let key of Object.keys(draw.__.layer)) {
                draw.__.stage.add(draw.__.layer[key]);
            }
            let bgRect = new Konva.Rect({
                x: 0,
                y: 0,
                width: stage.width(),
                height: stage.height(),
                fill: "#DDDDDD",
                listening: true  // listen for clicks on the stage rectangle
            });
            draw.__.layer.bg.add(bgRect);
        }
        else {
            return draw.__.stage;
        }
    };
    draw.layerPoint = (layer = null) => {
        return draw.__.layer.point;
    };
    draw.layerPhase = (layer = null) => {
        return draw.__.layer.phase;
    };
    draw.draw = () => {
        for (let key of Object.keys(draw.__.layer)) {
            draw.__.layer[key].draw();
        }
    };
    draw.start = (pos, type) => {
        let useStyle = style.point[type];
        let point = new Konva.Circle({
            x: pos.x, // draw.option.paddingX + draw.option.startX
            y: pos.y, // draw.option.paddingY + 80
            radius: 10,
            fill: useStyle.stroke
        });
        draw.layerPoint().add(point);
        return point;
    };
    draw.end = (pos) => {
        let point = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            radius: 12,
            fill: "#4BC9F6"
        });
        draw.layerPoint().add(point);
        return point;
    };
    draw.point = (pos, type) => {
        let useStyle = style.point[type];
        let useHoverStyle = style.point[type + "Hover"];
        let point = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            ...useStyle
        });
        point.setAttr("ptype", type);
        point.on("mouseenter", (evt) => {
            stage.container().style.cursor = 'pointer';
            point.stroke(useHoverStyle.stroke);
            draw.layerPoint().draw();
        });
        point.on("mouseout", (evt) => {
            stage.container().style.cursor = 'default';
            point.stroke(useStyle.stroke);
            draw.layerPoint().draw();
        });
        draw.layerPoint().add(point);
        return point;
    };
    draw.connect = (from, to) => {
        let connectorType = to.getAttr("ptype");
        let linePoints = [];
        if (to.y() - from.y() == 0) {
            linePoints = [to.x(), to.y(), from.x(), from.y()];
        }
        else {
            linePoints = [
                to.x(), to.y(),
                to.x() - 50, to.y(),
                to.x() - 50, from.y(),
                from.x(), from.y()
            ];
        }
        let connector = new Konva.Line({
            points: linePoints,
            ...style.hConnector[connectorType]
        });
        draw.layerPoint().add(connector);
        connector.zIndex(0);
        return connector;
    };
    draw.phase = (fromX, toX, text) => {
        let phaseHeight = draw.stage().height() - (2 * draw.option.paddingY);
        let phaseWidth = toX - fromX;
        let phase = new Konva.Rect({
            x: fromX,
            y: draw.option.paddingY,
            width: phaseWidth,
            height: phaseHeight,
            cornerRadius: 10,
            fill: "#FFFFFF"
        });
        let textShape = new Konva.Text({
            x: fromX,
            y: draw.option.paddingY + 14,
            width: phaseWidth,
            text: text,
            fontSize: 24,
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            align: 'center'
        });

        draw.layerPhase().add(phase);
        draw.layerPhase().add(textShape);
    };

    return draw;
};