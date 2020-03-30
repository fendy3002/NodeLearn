window.stepProgress = window.stepProgress || {};
window.stepProgress.style = window.stepProgress.style || {};
(function (style) {
    style.point = {
        base: {
            radius: 12,
            fill: '#FFFFFF',
            stroke: '#AAAAAA',
            strokeWidth: 6
        }
    };

    style.point.pending = {
        ...style.point.base,
        fill: '#FFFFFF',
        stroke: '#AAAAAA',
    };
    style.point.pendingHover = {
        fill: '#DFDFDF',
        stroke: '#CACACA'
    };
    style.point.done = {
        ...style.point.base,
        stroke: '#4BC9F6',
    };
    style.point.doneHover = {
        stroke: '#b7e9fb'
    };
    style.point.active = {
        ...style.point.base,
        stroke: '#56B64C',
    };
    style.point.activeHover = {
        stroke: '#bbe1b7'
    };
    style.point.terminated = {
        ...style.point.base,
        stroke: '#EF5839',
    };
    style.point.terminatedHover = {
        stroke: '#f8bcaf'
    };

    style.hConnector = {
        base: {
            strokeWidth: 4,
        }
    };
    style.hConnector.pending = {
        ...style.hConnector.base,
        stroke: '#AAAAAA'
    };
    style.hConnector.done = {
        ...style.hConnector.base,
        stroke: '#4BC9F6'
    };
    style.hConnector.active = {
        ...style.hConnector.base,
        stroke: '#56B64C'
    };
    style.hConnector.terminated = {
        ...style.hConnector.base,
        stroke: '#EF5839'
    };

    style.phase = {
        base: {
            fill: "#FFFFFF",

        }
    };
})(window.stepProgress.style);