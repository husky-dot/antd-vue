import { InputNumber } from 'ant-design-vue';
import { defineComponent, ref, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'TQuInputNumberRange',
  props: {
    // ...InputNumber.props,
    value: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    minValue: {
      type: Number,
      default: null,
    },
    maxValue: {
      type: Number,
      default: null,
    },
    startPlaceHolder: {
      type: String,
      default: '',
    },
    endPlaceHolder: {
      type: String,
      default: '',
    },
  },
  emits: ['update:value', 'change'],
  setup(props, { slots, emit }) {
    const { value, minValue, maxValue } = toRefs(props);
    const internalMin = ref<number | null>(value.value[0] || minValue.value);
    const internalMax = ref<number | null>(value.value[1] || maxValue.value);

    const handleMinChange = (val: any) => {
      if (val && internalMax.value && val > internalMax.value) {
        internalMin.value = internalMax.value;
      } else {
        internalMin.value = val;
      }
      emitUpdate();
    };
    const handleMaxChange = (val: any) => {
      if (val && internalMin.value && val < internalMin.value) {
        internalMax.value = internalMin.value;
      } else {
        internalMax.value = val;
      }
      emitUpdate();
    };

    const emitUpdate = () => {
      emit('update:value', [internalMin.value, internalMax.value]);
      emit('change', [internalMin.value, internalMax.value]);
    };

    watch(value, (newValue) => {
      internalMin.value = newValue[0];
      internalMax.value = newValue[1];
    });

    return () => {
      return (
        <div class="tqu-ant-input-number-range-wrapper">
          <InputNumber
            v-model={[internalMin.value, 'value']}
            min={props.minValue}
            onChange={handleMinChange}
            placeholder={props.startPlaceHolder}
            controls={false}
          />
          <span class="tqu-ant-input-number-range-division">~</span>
          <InputNumber
            v-model={[internalMax.value, 'value']}
            max={props.maxValue}
            onChange={handleMaxChange}
            placeholder={props.endPlaceHolder}
            controls={false}
          />
        </div>
      );
    };
  },
});
