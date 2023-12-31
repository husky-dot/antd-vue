import type { CSSProperties, PropType } from 'vue';
import { defineComponent, computed, unref } from 'vue';

import { Tooltip } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';

import { getPopupContainer } from '../../../utils';
import { isString, isArray } from '../../../utils/is';
import { getSlot } from '../../../utils/helper/tsxHelper';
import { propTypes } from '../../../utils/propTypes';


export default defineComponent({
  name: 'TQuBasicHelp',
  components: { Tooltip },
  props: {
    // max-width
    maxWidth: propTypes.string.def('600px'),
    // Whether to display the serial number
    showIndex: propTypes.bool,
    // color
    color: propTypes.string.def('#ffffff'),
    fontSize: propTypes.string.def('14px'),
    placement: propTypes.string.def('right'),
    absolute: propTypes.bool,
    // Text list
    text: {
      type: [Array, String] as PropType<string[] | string>,
    },
    // 定位
    position: {
      type: [Object] as PropType<any>,
      default: () => ({
        position: 'absolute',
        left: 0,
        bottom: 0,
      }),
    },
  },
  setup(props, { slots }) {

    const getOverlayStyle = computed(
      (): CSSProperties => {
        return {
          maxWidth: props.maxWidth,
        };
      }
    );

    const getWrapStyle = computed(
      (): CSSProperties => {
        return {
          color: props.color,
          fontSize: props.fontSize,
        };
      }
    );

    const getMainStyleRef = computed(() => {
      return props.absolute ? props.position : {};
    });

    const renderTitle = () => {
      const list = props.text;

      if (isString(list)) {
        return <p>{list}</p>;
      }

      if (isArray(list)) {
        return list.map((item, index) => {
          return (
            <p key={item}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {item}
              </>
            </p>
          );
        });
      }

      return null;
    };

    return () => {
      return (
        <Tooltip
          title={<div style={unref(getWrapStyle)}>{renderTitle()}</div>}
          overlayClassName={`tqu-ant-basic-help__wrap`}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as 'left'}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class='tqu-ant-basic-help' style={unref(getMainStyleRef)}>
            {getSlot(slots) || <InfoCircleOutlined />}
          </span>
        </Tooltip>
      );
    };
  },
});