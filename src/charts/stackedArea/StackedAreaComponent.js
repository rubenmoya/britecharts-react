import React from 'react';
import PropTypes from 'prop-types';
import stackedArea from './stackedAreaChart';


class StackedAreaComponent extends React.Component {

    static propTypes = {
        /**
         * Internally used, do not overwrite.
         */
        data: PropTypes.arrayOf(PropTypes.any).isRequired,

        /**
         * Exposes the constants to be used to force the x axis to respect a
         * certain granularity current options: MINUTE_HOUR, HOUR_DAY, DAY_MONTH, MONTH_YEAR
         */
        axisTimeCombinations: PropTypes.number,
        /**
         * Gets or Sets the opacity of the stacked areas in the chart
         * (all of them will have the same opacity)
         */
        areaOpacity: PropTypes.number,
        /**
         * Gets or Sets the aspect ratio of the chart
         */
        aspectRatio: PropTypes.number,
        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),
        /**
         * Gets or Sets the dateLabel of the chart
         */
        dateLabel: PropTypes.number,
        /**
         * Gets or Sets the grid mode.
         */
        grid: PropTypes.string,
        /**
         * Gets or Sets the height of the chart
         */
        height: PropTypes.number,
        /**
         * Gets or Sets the isAnimated property of the chart, making it to animate
         * when render. By default this is 'false'
         */
        isAnimated: PropTypes.bool,
        /**
         * Gets or Sets the keyLabel of the chart
         */
        keyLabel: PropTypes.number,
        /**
         * Pass language tag for the tooltip to localize the date. Feature
         * uses Intl.DateTimeFormat, for compatability and support, refer
         * to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
         */
        locale: PropTypes.string,
        /**
         * Gets or Sets the margin of the chart
         */
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number,
        }),
        /**
         * Gets or Sets the minimum width of the graph in order
         * to show the tooltip NOTE: This could also depend on the aspect ratio
         */
        tooltipThreshold: PropTypes.number,
        /**
         * Gets or Sets the valueLabel of the chart
         */
        valueLabel: PropTypes.number,
        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,
        /**
         * Exposes the ability to force the chart to show a certain x format
         * It requires a `xAxisFormat` of 'custom' in order to work.
         * NOTE: localization not supported
         */
        xAxisCustomFormat: PropTypes.string,
        /**
         * Exposes the ability to force the chart to show a certain x axis grouping
         */
        xAxisFormat: PropTypes.string,
        /**
         * Exposes the ability to force the chart to show a certain x ticks. It
         * requires a `xAxisFormat` of 'custom' in order to work. NOTE: This
         * value needs to be a multiple of 2, 5 or 10. They won't always work
         * as expected, as D3 decides at the end how many and where the ticks will appear.
         */
        xTicks: PropTypes.number,
        /**
         * Gets or Sets the number of ticks of the y axis on the chart (Default is 5)
         */
        yTicks: PropTypes.number,

        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,

        /**
         * Internally used, do not overwrite.
         *
         * @ignore
         */
        chart: PropTypes.object,
    }

    static defaultProps = {
        chart: stackedArea,
        createTooltip: () => null,
    }

    constructor(props) {
        super(props);

        // We want to make this throw an error if no data is provided
        if (!props.data) {
            throw new Error('Data is required!');
        }
    }

    componentDidMount() {
        this._chart = this.props.chart.create(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration()
        );
    }

    componentDidUpdate() {
        this.props.chart.update(
            this._rootNode,
            this.props.data,
            this._getChartConfiguration(),
            this._chart
        );

        this.props.createTooltip();
    }

    componentWillUnmount() {
        this.props.chart.destroy(this._rootNode);
    }

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    _getChartConfiguration() {
        let configuration = {...this.props};

        delete configuration.data;
        delete configuration.chart;
        delete configuration.createTooltip;

        return configuration;
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (
            <div className="stacked-area-container" ref={this._setRef.bind(this)} />
        );
    }
}

export default StackedAreaComponent;
