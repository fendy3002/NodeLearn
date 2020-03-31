window.stepProgress = window.stepProgress || {};
window.stepProgress.draw = window.stepProgress.draw || {};

window.stepProgress.draw = function (option) {
    let style = window.stepProgress.style;
    let draw = {
        option: {
            stageHeight: 300,
            stageWidth: 1000,
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
                tooltip: null
            }
        }
    };
    draw.setStage = (containerId, optional) => {
        draw.__.stage = new Konva.Stage({
            container: containerId,   // id of container <div>
            width: draw.option.stageWidth,
            height: draw.option.stageHeight,
            ...optional
        });
        draw.__.layer = {
            bg: new Konva.Layer(),
            phase: new Konva.Layer(),
            point: new Konva.Layer(),
            tooltip: new Konva.Layer(),
        };
        for (let key of Object.keys(draw.__.layer)) {
            draw.__.stage.add(draw.__.layer[key]);
        }
        let bgRect = new Konva.Rect({
            x: 0,
            y: 0,
            width: draw.__.stage.width(),
            height: draw.__.stage.height(),
            fill: "#DDDDDD",
            listening: true  // listen for clicks on the stage rectangle
        });
        draw.__.layer.bg.add(bgRect);
    }
    draw.stage = () => {
        return draw.__.stage;
    };
    draw.layerPoint = () => {
        return draw.__.layer.point;
    };
    draw.layerTooltip = () => {
        return draw.__.layer.tooltip;
    };
    draw.layerPhase = () => {
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
    draw.point = (pos, type, option) => {
        let useStyle = style.point[type];
        let useHoverStyle = style.point[type + "Hover"];
        let point = new Konva.Circle({
            x: pos.x,
            y: pos.y,
            ...useStyle
        });

        let xDir = 'l';
        let yDir = 'b';
        if (pos.x > draw.stage().width() / 2) {
            xDir = 'r';
        }
        if (pos.y > draw.stage().height() / 2) {
            yDir = 't';
        }
        let label = null;
        let addLabel = null;
        if (option && option.text) {
            label = new Konva.Label({
                x: 0,
                y: 0,
                opacity: 0.85
            });
            label.add(
                new Konva.Tag({
                    ...style.pointTextTag.base,
                })
            );
            label.add(
                new Konva.Text({
                    ...style.pointText.base,
                    text: option.text,
                })
            );
            let labelX; let labelY;
            if (xDir == 'l') {
                labelX = pos.x + point.width() / 2 + useStyle.strokeWidth;
            }
            else {
                labelX = pos.x - point.width() - useStyle.strokeWidth - label.width();
            }
            if (yDir == 'b') {
                labelY = pos.y;
            }
            else {

            }
            label.x(labelX);
            label.y(labelY);
            label.hide();

            if (option.additionalText) {
                addLabel = new Konva.Label({
                    x: labelX,
                    y: label.y() + label.height(),
                    opacity: 0.85
                });
                addLabel.add(
                    new Konva.Tag({
                        ...style.pointTextTag.base,
                    })
                );
                addLabel.add(
                    new Konva.Text({
                        ...style.pointTextAdd.base,
                        text: option.additionalText,
                    })
                );
                addLabel.hide();
            }
        }

        point.setAttr("ptype", type);
        point.on("mouseenter", (evt) => {
            draw.stage().container().style.cursor = 'pointer';
            point.stroke(useHoverStyle.stroke);
            if (label) {
                label.show();
                if (addLabel) {
                    addLabel.show();
                }
            }
            draw.layerTooltip().draw();
            draw.layerPoint().draw();
        });
        point.on("mouseout", (evt) => {
            draw.stage().container().style.cursor = 'default';
            point.stroke(useStyle.stroke);
            if (label) {
                label.hide();
                if (addLabel) {
                    addLabel.hide();
                }
            }
            draw.layerTooltip().draw();
            draw.layerPoint().draw();
        });
        draw.layerPoint().add(point);
        if (label) {
            draw.layerTooltip().add(label);
            if (addLabel) {
                draw.layerTooltip().add(addLabel);
            }
        }
        return point;
    };

    draw.parallel = (pos, type) => {
        let useStyle = style.point[type];
        let point = new Konva.RegularPolygon({
            x: pos.x,
            y: pos.y,
            sides: 3,
            ...useStyle
        });
        point.rotate(180);
        point.setAttr("ptype", type);
        draw.layerPoint().add(point);
        return point;
    };
    draw.parallelEnd = (pos, type) => {
        let useStyle = style.point[type];
        let point = new Konva.RegularPolygon({
            x: pos.x,
            y: pos.y,
            sides: 3,
            ...useStyle
        });
        point.setAttr("ptype", type);
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
                to.x() - (draw.option.pointSpace / 2), to.y(),
                to.x() - (draw.option.pointSpace / 2), from.y(),
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
    draw.phase = (fromX, width, text) => {
        let phaseHeight = draw.stage().height() - (2 * draw.option.paddingY) - draw.option.footerHeight;
        let phase = new Konva.Rect({
            ...style.phase.base,
            x: fromX,
            y: draw.option.paddingY,
            width: width,
            height: phaseHeight,
        });
        let textShape = new Konva.Text({
            ...style.phaseText.base,
            x: fromX,
            y: draw.option.paddingY + 14,
            width: width,
            text: text,
        });

        draw.layerPhase().add(phase);
        draw.layerPhase().add(textShape);
    };

    return draw;
};