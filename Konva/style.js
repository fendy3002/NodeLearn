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
    style.pointText = {
        base: {
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            fontSize: 12,
            padding: 8,
            width: 180,
            fontStyle: 'bold'
        }
    };
    style.pointTextAdd = {
        base: {
            ...style.pointText.base,
            fontStyle: 'normal'
        }
    };
    style.pointTextTag = {
        base: {
            fill: '#FFFFFF'
        }
    };
    style.phase = {
        base: {
            cornerRadius: 10,
            fill: "#FFFFFF",
        }
    };
    style.phaseText = {
        base: {
            fontSize: 12,
            fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
            align: 'center',
            fontStyle: 'bold'
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