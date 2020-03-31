window.stepProgress = window.stepProgress || {};
window.stepProgress.make = window.stepProgress.make || {};

window.stepProgress.make = function (containerId, option) {
    let make = {
        option: {
            pointSpace: 50,
            phaseSpace: 10,
            phasePaddingX: 20,
            vSpace: 40,
            minStageHeight: 300,
            minStageWidth: 1000,
            minPhaseWidth: 180,
            stageHeight: 300,
            stageWidth: 1000,
            paddingX: 20,
            paddingY: 10,
            footerHeight: 80,
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
    let startX = (make.option.paddingX + make.option.startX);
    let pointMap = {};
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
            }, shadowPoint.type, {
                text: shadowPoint.name,
                additionalText: shadowPoint.additionalText,
            });
            shadowPoint.renderPoint = point;
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
            shadowPoint.renderPoint = point;
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
            shadowPoint.renderPoint = point;
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
        shadowPoint.name = point.name;
        shadowPoint.additionalText = point.additionalText;
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
    make.calculatePhaseWidth = (phase, point, currentWidth) => {
        if (!point.prev) {
            return currentWidth;
        }
        else if (point.pointType != "parallel_end" && point.prev.phase.index == phase.index) {
            return make.calculatePhaseWidth(phase, point.prev, currentWidth + 1);
        }
        else if (point.pointType == "parallel_end") {
            let maxWidth = 1;
            for (let prev of point.prevs) {
                let width = 0;
                if (prev.phase.index == phase.index) {
                    width++;
                }
                while (prev.prev.phase.index == phase.index && prev.prev.pointType != "parallel") {
                    prev = prev.prev;
                    width++;
                }
                maxWidth = Math.max(maxWidth, width);
            }
            if (point.prev.phase.index == phase.index) {
                return make.calculatePhaseWidth(phase, point.prev, currentWidth + maxWidth + 1);
            }
            else {
                return currentWidth + maxWidth;
            }
        }
        return currentWidth;
    };
    make.updatePhaseFromPointRelation = () => {
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            let width = 1;
            for (let pointId of phase.member) {
                width = Math.max(make.calculatePhaseWidth(phase, pointMap[pointId], 1), width);
            }
            phase.width = Math.max(make.option.minPhaseWidth, (width * make.option.pointSpace) + (2 * make.option.phasePaddingX));
        }
        let leftX = startX + make.option.pointSpace;
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            if (leftX > phase.startX) {
                phase.startX = leftX;
            }
            leftX = phase.startX + phase.width + make.option.phaseSpace;
            for (let memberId of phase.member) {
                let member = pointMap[memberId];
                member.minX = phase.startX;
            }
        }
    };
    make.updateX = (point) => {
        let minX = (point.minX) + make.option.phaseSpace + make.option.phasePaddingX;
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
            let phase = phaseContext[phaseIndex];
            draw.phase(phase.startX,
                phase.width,
                phase.text);
        }
    };

    make.render = (point) => {
        let pointRelation = make.generatePointRelationEach(point, null);
        make.updatePhaseFromPointRelation();
        make.updateX(pointRelation);
        make.updateY(pointRelation);

        let longestId = "";

        let stageRight = 0;
        let stageHeight = 0;
        for (let pointId of Object.keys(pointMap)) {
            if (pointId.length > longestId.length) {
                longestId = pointId;
            }
            stageHeight = Math.max(stageHeight, pointMap[pointId].y);
        }
        stageHeight += make.option.footerHeight;
        for (let phaseIndex of Object.keys(phaseContext)) {
            let phase = phaseContext[phaseIndex];
            stageRight = Math.max(stageRight, phase.startX + phase.width);
        }
        stageRight += make.option.startX + startX + make.option.paddingX;
        stageRight = Math.max(make.option.minStageWidth, stageRight);
        stageHeight = Math.max(make.option.minStageHeight, stageHeight);
        draw.setStage(containerId, {
            width: stageRight,
            height: stageHeight + (2 * make.option.paddingY) + make.option.phasePaddingX
        });
        make.renderShadowPoint(pointRelation);
        make.renderPhase();

        let lastPoint = pointMap[longestId];
        let endPoint = draw.start({
            x: stageRight - make.option.startX - make.option.paddingX,
            y: make.option.paddingY + 80
        }, lastPoint.type);
        endPoint.setAttr("ptype", lastPoint.type);
        draw.connect(lastPoint.renderPoint, endPoint);
        draw.draw();
    };

    return make;
};