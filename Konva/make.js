window.stepProgress = window.stepProgress || {};
window.stepProgress.make = window.stepProgress.make || {};

window.stepProgress.make = function (containerId, option) {
    let make = {
        option: {
            pointSpace: 50,
            phaseSpace: 10,
            phasePaddingX: 20,
            vSpace: 40,
            stageHeight: 1000,
            stageWidth: 5000,
            paddingX: 20,
            paddingY: 10,
            startX: 30,
            phase: [],
            ...option
        },
        __: {
            start: null
        }
    };
    let draw = window.stepProgress.draw(make.option);
    make.draw = draw;

    let phaseContext = {};
    for (let i = 0; i < make.option.phase.length; i++) {
        phaseContext[i] = {
            index: i,
            text: make.option.phase[i],
            startX: null,
            width: null,
            member: []
        };
    }
    let pointMap = {};
    make.updatePhaseFromShadowPoint = (shadowPoint) => {
        shadowPoint.phase.width = Math.max(shadowPoint.phase.width, shadowPoint.x);
        if (shadowPoint.pointType != "parallel" && shadowPoint.pointType != "parallel_end") {
            if (shadowPoint.next) {
                make.updatePhaseFromShadowPoint(shadowPoint.next);
            }
        }
        else if (shadowPoint.pointType == "parallel") {
            for (let item of shadowPoint.items) {
                make.updatePhaseFromShadowPoint(item);
            }
            if (shadowPoint.next) {
                make.updatePhaseFromShadowPoint(shadowPoint.next);
            }
        }
        else if (shadowPoint.pointType == "parallel_end") {
            if (shadowPoint.next) {
                make.updatePhaseFromShadowPoint(shadowPoint.next);
            }
        }
    };
    make.updatePhase = () => {
        let x = make.option.paddingX + make.option.startX +
            make.option.phaseSpace + make.option.phasePaddingX;
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            phase.startX = x - make.option.phaseSpace;
            phase.width += 2 * make.option.phaseSpace;
            x = x + phase.width + make.option.phaseSpace;
        }
    };
    make.generateShadowPoint = (point, prev) => {
        let shadowPoint = {};
        shadowPoint.type = point.type;
        shadowPoint.pointType = point.pointType;
        shadowPoint.phase = phaseContext[point.phase];
        shadowPoint.x = prev.x + make.option.pointSpace;
        shadowPoint.y = prev.y;
        if (point.pointType != "parallel") {
            shadowPoint.height = make.option.vSpace;
            // case for last step in parallel
            if (point.next) {
                shadowPoint.next = make.generateShadowPoint(point.next, shadowPoint);
                shadowPoint.height = Math.max(shadowPoint.height, shadowPoint.next.height);
            }
            else {
                shadowPoint.next = null;
            }
        }
        else {
            shadowPoint.height = 0;
            shadowPoint.items = [];

            let shadowParallelEnd = {
                y: shadowPoint.y,
                prevs: []
            };
            shadowParallelEnd.pointType = "parallel_end";
            shadowPoint.next = shadowParallelEnd;
            let maxX = 0;
            let maxPhase = 0;
            let hasPending = false;
            for (let i = 0; i < point.items.length; i++) {
                let pointItem = point.items[i];
                let shadowItem = {};
                if (pointItem.pointType == "parallel") {
                    shadowItem = make.generateShadowPoint(pointItem, {
                        ...shadowPoint,
                        y: shadowPoint.y + shadowPoint.height
                    });
                    shadowPoint.height += shadowItem.height;
                    shadowPoint.items.push(shadowItem);
                    continue;
                }
                shadowItem.type = pointItem.type;
                shadowItem.phase = phaseContext[pointItem.phase];
                shadowItem.x = shadowPoint.x + make.option.pointSpace;
                shadowItem.y = shadowPoint.y + shadowPoint.height;
                shadowItem.height = make.option.vSpace;
                shadowItem.prev = shadowPoint;

                if (shadowItem.type == "active" || shadowItem.type == "pending") {
                    hasPending = true;
                }
                maxPhase = Math.max(maxPhase, shadowItem.phase.index);
                maxX = Math.max(maxX, shadowItem.x);
                if (pointItem.next) {
                    shadowItem.next = make.generateShadowPoint(pointItem.next, shadowItem);
                    let _next = shadowItem.next;
                    shadowPoint.height = Math.max(shadowPoint.height, _next.height);
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
                shadowPoint.height += shadowItem.height;
                shadowPoint.items.push(shadowItem);
            }
            shadowParallelEnd.x = maxX + make.option.pointSpace;
            shadowParallelEnd.type = hasPending ? "pending" : "done";
            shadowParallelEnd.phase = phaseContext[maxPhase];
            if (point.next) {
                shadowParallelEnd.next = make.generateShadowPoint(point.next, shadowParallelEnd);
            }
            shadowPoint.height += make.option.vSpace;
        }
        shadowPoint.prev = prev;
        return shadowPoint;
    };
    make.renderShadowPoint = (shadowPoint, prevPoint) => {
        if (!shadowPoint.prev) {
            let startPoint = draw.start({
                x: make.option.paddingX + make.option.startX,
                y: make.option.paddingY + 80
            }, "done");
            make.__.start = startPoint;
        }
        let point = null;
        if (shadowPoint.pointType != "parallel" && shadowPoint.pointType != "parallel_end") {
            point = draw.point({
                x: shadowPoint.x,
                y: shadowPoint.y
            }, shadowPoint.type);
            if (!shadowPoint.prev) {
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
            for (let i = 0; i < shadowPoint.nexts.length; i++) {
                point.nexts.push(make.renderShadowPoint(shadowPoint.nexts[i], point));
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

    make.generatePointRelationEach = (point, prevPoint) => {
        let shadowPoint = {};
        shadowPoint.point = point;
        shadowPoint.type = point.type;
        shadowPoint.pointType = point.pointType;
        shadowPoint.phase = phaseContext[point.phase];
        if (prevPoint) {
            shadowPoint.prev = prevPoint;
            if (prevPoint.pointType != "parallel") {
                shadowPoint.id = prevPoint.id + "_0";
            }
            else if (prevPoint.pointType == "parallel") {
                shadowPoint.id = prevPoint.id + "_" + prevPoint.nexts.length;
            }
        }
        else {
            shadowPoint.id = "0";
        }
        shadowPoint.phase.member.push(shadowPoint.id);
        pointMap[shadowPoint.id] = shadowPoint;
        if (shadowPoint.pointType != "parallel") {
            if (point.next) {
                shadowPoint.next = make.generatePointRelationEach(point.next, shadowPoint);
            }
        }
        else if (shadowPoint.pointType == "parallel") {
            shadowPoint.nexts = [];
            let maxPhaseIndex = 0;
            let longestId = "";
            let hasPending = false;
            let shadowParallelEnd = {
                pointType: "parallel_end",
                prevs: [],
            };
            for (let each of point.items) {
                let itemPoint = make.generatePointRelationEach(each, shadowPoint);
                shadowPoint.nexts.push(itemPoint);
                while (itemPoint.next) {
                    itemPoint = itemPoint.next;
                }
                if (longestId.length < itemPoint.id.length) {
                    longestId = itemPoint.id;
                }
                hasPending = itemPoint.type == "active" || itemPoint.type == "pending";
                maxPhaseIndex = Math.max(maxPhaseIndex, itemPoint.phase.index);
                shadowParallelEnd.prevs.push(itemPoint);
            }
            shadowParallelEnd.type = hasPending ? "pending" : "done";
            shadowParallelEnd.phase = phaseContext[maxPhaseIndex];
            shadowParallelEnd.prev = shadowPoint;
            shadowParallelEnd.id = longestId + "_0";
            shadowPoint.next = shadowParallelEnd;

            pointMap[shadowParallelEnd.id] = shadowParallelEnd;
            shadowParallelEnd.phase.member.push(shadowParallelEnd.id);
            if (point.next) {
                shadowParallelEnd.next = make.generatePointRelationEach(point.next, shadowParallelEnd);
            }
        }
        return shadowPoint;
    };

    let startX = (make.option.paddingX + make.option.startX);
    make.updatePhaseFromPointRelation = () => {
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            let idLengths = phase.member.map(k => k.split("_").length);
            phase.minX = idLengths[0];
            phase.maxX = idLengths[0];
            for (let i = 1; i < idLengths.length; i++) {
                phase.minX = Math.min(phase.minX, idLengths[i]);
                phase.maxX = Math.max(phase.maxX, idLengths[i]);
            }
            phase.maxX++;
        }
        let maxX = 0;
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            if (phase.minX < maxX + 1) {
                let width = phase.maxX - phase.minX;
                phase.minX = maxX + 1;
                phase.maxX = phase.minX + width;
            }
            maxX = phase.maxX;
            for (let memberId of phase.member) {
                let member = pointMap[memberId];
                member.minX = phase.minX;
            }
        }
    };
    make.updateX = (point) => {
        let minX = startX + (point.minX * make.option.pointSpace) + make.option.phaseSpace + make.option.phasePaddingX;
        if (point.pointType != "parallel" && point.pointType != "parallel_end") {
            let prevX = 0;
            if (point.prev) {
                prevX = point.prev.x + make.option.pointSpace;
            }
            if (minX > prevX) {
                point.x = minX;
            }
            else {
                point.x = prevX;
            }
            if (point.next) {
                make.updateX(point.next);
            }
        }
        else if (point.pointType == "parallel") {
            let prevX = 0;
            if (point.prev) {
                prevX = point.prev.x + make.option.pointSpace;
            }
            if (minX > prevX) {
                point.x = minX;
            }
            else {
                point.x = prevX;
            }
            for (let next of point.nexts) {
                make.updateX(next);
            }
            make.updateX(point.next);
        }
        else if (point.pointType == "parallel_end") {
            let prevX = 0;
            for (let prev of point.prevs) {
                prevX = Math.max(prev.x, prevX);
            }
            point.x = prevX + make.option.pointSpace;
            if (point.next) {
                make.updateX(point.next);
            }
        }
    };
    make.updateY = (point) => {
        if (!point.prev) {
            point.y = make.option.paddingY + 80;
            point.height = make.option.vSpace;
        }
        else if (point.prev.pointType != "parallel") {
            point.y = point.prev.y;
            point.height = make.option.vSpace;
        }
        else if (point.prev.pointType == "parallel" && point.pointType != "parallel_end") {
            point.y = point.prev.y + point.prev.height;
            point.height = make.option.vSpace;
        }

        if (point.pointType != "parallel" && point.pointType != "parallel_end") {
            if (point.next && point.next.pointType != "parallel_end") {
                make.updateY(point.next);
            }
        }
        else if (point.pointType == "parallel") {
            point.height = 0;
            for (let next of point.nexts) {
                let itemHeight = 0;
                make.updateY(next);
                itemHeight = next.height;
                while (next.next && next.next.id != point.next.id) {
                    itemHeight = Math.max(itemHeight, next.height);
                    next = next.next;
                }
                point.height += itemHeight;
            }
            make.updateY(point.next);
        }
        else if (point.pointType == "parallel_end") {
            point.y = point.prev.y;
            if (point.next) {
                make.updateY(point.next);
            }
        }
    };
    make.renderPhase = () => {
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex]
            let phaseStartX = startX + (phase.minX * make.option.pointSpace);
            draw.phase(phaseStartX,
                startX + (phase.maxX * make.option.pointSpace) - phaseStartX,
                phase.text);
        }
    };

    make.render = (point) => {
        let pointRelation = make.generatePointRelationEach(point, null);
        make.updatePhaseFromPointRelation();
        make.updateX(pointRelation);
        make.updateY(pointRelation);
        console.log(pointMap);

        // let shadowPoint = make.generateShadowPoint(point, {
        //     x: make.option.paddingX + make.option.startX,
        //     y: make.option.paddingY + 80,
        //     type: "done",
        //     pointType: "start",
        //     phase: null
        // });
        // make.updatePhaseFromShadowPoint(shadowPoint);
        // make.updatePhase();

        draw.setStage(containerId);
        // let startPoint = draw.start({
        //     x: make.option.paddingX + make.option.startX,
        //     y: make.option.paddingY + 80
        // }, "done");
        make.renderShadowPoint(pointRelation);
        make.renderPhase();
        draw.draw();
    };

    return make;
};