window.stepProgress = window.stepProgress || {};
window.stepProgress.make = window.stepProgress.make || {};

window.stepProgress.make = function (option) {
    let style = window.stepProgress.style;
    let make = {
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
    make.stage = (stage = null) => {
        if (stage) {
            make.__.stage = stage;
            make.__.layer = {
                bg: new Konva.Layer(),
                phase: new Konva.Layer(),
                point: new Konva.Layer(),
            };
            for (let key of Object.keys(make.__.layer)) {
                make.__.stage.add(make.__.layer[key]);
            }
            let bgRect = new Konva.Rect({
                x: 0,
                y: 0,
                width: stage.width(),
                height: stage.height(),
                fill: "#DDDDDD",
                listening: true  // listen for clicks on the stage rectangle
            });
            make.__.layer.bg.add(bgRect);
        }
        else {
            return make.__.stage;
        }
    };
    make.layerPoint = (layer = null) => {
        return make.__.layer.point;
    };
    make.layerPhase = (layer = null) => {
        return make.__.layer.phase;
    };
    make.draw = () => {
        for (let key of Object.keys(make.__.layer)) {
            make.__.layer[key].draw();
        }
    };
    make.start = (type) => {
        let useStyle = style.point[type];
        let point = new Konva.Circle({
            x: make.option.paddingX + make.option.startX,
            y: make.option.paddingY + 80,
            radius: 10,
            fill: useStyle.stroke
        });
        make.layerPoint().add(point);
        return point;
    };
    make.end = (pos) => {
        let point = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            radius: 12,
            fill: "#4BC9F6"
        });
        make.layerPoint().add(point);
        return point;
    };
    make.point = (pos, type) => {
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
            make.layerPoint().draw();
        });
        point.on("mouseout", (evt) => {
            stage.container().style.cursor = 'default';
            point.stroke(useStyle.stroke);
            make.layerPoint().draw();
        });
        make.layerPoint().add(point);
        return point;
    };
    make.connect = (from, to) => {
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
        make.layerPoint().add(connector);
        connector.zIndex(0);
        return connector;
    };
    make.phase = (fromX, toX, text) => {
        let phaseHeight = make.stage().height() - (2 * make.option.paddingY);
        let phaseWidth = toX - fromX;
        let phase = new Konva.Rect({
            x: fromX,
            y: make.option.paddingY,
            width: phaseWidth,
            height: phaseHeight,
            cornerRadius: 10,
            fill: "#FFFFFF"
        });
        let textShape = new Konva.Text({
            x: fromX,
            y: make.option.paddingY + 14,
            width: phaseWidth,
            text: text,
            fontSize: 24,
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            align: 'center'
        });

        make.layerPhase().add(phase);
        make.layerPhase().add(textShape);
    };

    return make;
};