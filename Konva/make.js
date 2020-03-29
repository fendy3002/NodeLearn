window.stepProgress = window.stepProgress || {};
window.stepProgress.make = window.stepProgress.make || {};

window.stepProgress.make = function (containerId, option) {
    let make = {
        option: {
            space: 100,
            vSpace: 50,
            stageHeight: 300,
            stageWidth: 5000,
            paddingX: 20,
            paddingY: 10,
            startX: 50,
            phase: [],
            ...option
        },
        __: {
            start: null
        }
    };
    let draw = window.stepProgress.draw(make.option);
    make.draw = draw;

    draw.setStage(containerId);
    let startPoint = draw.start({
        x: make.option.paddingX + make.option.startX,
        y: make.option.paddingY + 80
    }, "done");

    let phaseContext = {};
    for (let i = 0; i < make.option.phase.length; i++) {
        phaseContext[i] = {
            index: i,
            text: make.option.phase[i],
            startX: null,
            width: null
        };
    }
    make.preRender = (point, prev) => {
        let shadowPoint = {};
        if (point.pointType != "parallel") {
            shadowPoint.type = point.type;
            shadowPoint.phase = phaseContext[point.phase];
            shadowPoint.x = prev.x + make.option.space;
            shadowPoint.y = prev.y;
            // case for last step in parallel
            if (point.next) {
                shadowPoint.next = make.preRender(point.next, shadowPoint);
            }
            else {
                shadowPoint.next = null;
            }
        }
        else {
            shadowPoint.type = point.type;
            shadowPoint.pointType = point.pointType;
            shadowPoint.phase = phaseContext[point.phase];
            shadowPoint.x = prev.x + make.option.space;
            shadowPoint.y = prev.y;
            let shadowParallelEnd = {
                y: shadowPoint.y,
                prevs: []
            };
            shadowParallelEnd.pointType = "parallel_end";
            shadowPoint.next = shadowParallelEnd;
            shadowPoint.items = [];
            let maxX = 0;
            let maxPhase = 0;
            let hasPending = false;
            for (let i = 0; i < point.items.length; i++) {
                let pointItem = point.items[i];
                let shadowItem = {};
                if (pointItem.pointType == "parallel") {
                    shadowItem = make.preRender(pointItem, {
                        ...shadowPoint,
                        y: shadowPoint.y + (i * make.option.vSpace)
                    });
                    shadowPoint.items.push(shadowItem);
                    continue;
                }
                shadowItem.type = pointItem.type;
                shadowItem.phase = phaseContext[pointItem.phase];
                shadowItem.x = shadowPoint.x + make.option.space;
                shadowItem.y = shadowPoint.y + (i * make.option.vSpace);
                shadowItem.prev = shadowPoint;

                if (shadowItem.type == "active" || shadowItem.type == "pending") {
                    hasPending = true;
                }
                maxPhase = Math.max(maxPhase, shadowItem.phase.index);
                maxX = Math.max(maxX, shadowItem.x);
                if (pointItem.next) {
                    shadowItem.next = make.preRender(pointItem.next, shadowItem);
                    let _next = shadowItem.next;
                    while (_next.next) {
                        if (_next.type == "active" || _next.type == "pending") {
                            hasPending = true;
                        }
                        _next = _next.next;
                        maxX = Math.max(maxX, _next.x);
                        maxPhase = Math.max(maxPhase, _next.phase.index);
                    }
                    if (_next.type == "active" || _next.type == "pending") {
                        hasPending = true;
                    }
                    maxX = Math.max(maxX, _next.x);
                    maxPhase = Math.max(maxPhase, _next.phase.index);
                    shadowParallelEnd.prevs.push(_next);
                }
                else {
                    shadowParallelEnd.prevs.push(shadowItem);
                }
                shadowPoint.items.push(shadowItem);
            }
            shadowParallelEnd.x = maxX + make.option.space;
            shadowParallelEnd.type = hasPending ? "pending" : "done";
            shadowParallelEnd.phase = phaseContext[maxPhase];
            if (point.next) {
                shadowParallelEnd.next = make.preRender(point.next, shadowParallelEnd);
            }
            // else {
            //     return shadowParallelEnd;
            // }
        }
        shadowPoint.prev = prev;

        return shadowPoint;
    };
    make.renderShadowPoint = (shadowPoint, prevPoint) => {
        if (shadowPoint.prev && shadowPoint.prev.pointType == "start") {
            let startPoint = draw.start({
                x: shadowPoint.prev.x,
                y: shadowPoint.prev.y
            }, shadowPoint.prev.type);
            make.__.start = startPoint;
        }
        let point = null;
        if (shadowPoint.pointType != "parallel" && shadowPoint.pointType != "parallel_end") {
            point = draw.point({
                x: shadowPoint.x,
                y: shadowPoint.y
            }, shadowPoint.type);
            if (shadowPoint.prev.pointType == "start") {
                draw.connect(make.__.start, point);
                make.__.start.next = point;
                point.prev = make.__.start;
            }
            else {
                draw.connect(prevPoint, point);
                prevPoint.next = point;
                point.prev = prevPoint;
            }
            if (shadowPoint.next) {
                make.renderShadowPoint(shadowPoint.next, point);
            }
        }
        else if (shadowPoint.pointType == "parallel") {
            point = draw.parallel({
                x: shadowPoint.x,
                y: shadowPoint.y
            }, shadowPoint.type);
            point.nexts = [];

            if (shadowPoint.prev.pointType == "start") {
                draw.connect(make.__.start, point);
                make.__.start.next = point;
                point.prev = make.__.start;
            }
            else {
                draw.connect(prevPoint, point);
                prevPoint.next = point;
                point.prev = prevPoint;
            }
            for (let i = 0; i < shadowPoint.items.length; i++) {
                point.nexts.push(make.renderShadowPoint(shadowPoint.items[i], point));
            }
            if (shadowPoint.next) {
                point.next = make.renderShadowPoint(shadowPoint.next, point);
            }
        }
        else if (shadowPoint.pointType == "parallel_end") {
            point = draw.parallelEnd({
                x: shadowPoint.x,
                y: shadowPoint.y
            }, shadowPoint.type);
            if (prevPoint.nexts) {
                console.log(prevPoint.nexts);
                for (let each of prevPoint.nexts) {
                    let last = each;
                    while (last.next) {
                        last = last.next;
                    }
                    draw.connect(last, point);
                }
            }
            if (shadowPoint.next) {
                make.renderShadowPoint(shadowPoint.next, point);
            }
        }
        return point;
    };
    make.render = (point) => {
        let shadowPoint = make.preRender(point, {
            x: startPoint.x(),
            y: make.option.paddingY + 80,
            type: "done",
            pointType: "start",
            phase: null
        });
        console.log(shadowPoint);
        make.renderShadowPoint(shadowPoint);
        draw.draw();
    };

    return make;
};