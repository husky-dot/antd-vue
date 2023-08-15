import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { InputNumberRange } from '@/index';
import '@/components/InputNumberRange/style/index.less';
import mdx from './InputNumberRange.mdx';

export default {
  title: '组件/InputNumberRange',
  component: InputNumberRange,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  // argTypes: {
  //   listType: {
  //     description: '上传列表的内建样式 ',
  //     control: { type: 'select' },
  //     defaultValue: 'picture',
  //     options: ['text', 'picture', 'picture-card'],
  //     table: {
  //       defaultValue: { summary: 'picture' }, // https://github.com/storybookjs/storybook/issues/11983
  //     },
  //   },
  // },
};

export const API: any = (args: any, { argTypes }: any) => ({
  setup(props: any, { emit }: any) {
    return () => {
      return <div></div>;
    };
  },
});

API.parameters = {
  controls: {
    disabled: true,
  },
};

export const Basic: any = (args: any) => ({
  setup() {
    const rang = ref([1, 100]);
    return () => {
      return (
        <div>
          <InputNumberRange v-model={[rang.value, 'value']}></InputNumberRange>
          <br />
          <p>当前值：{JSON.stringify(rang.value)}</p>
        </div>
      );
    };
  },
});
Basic.storyName = '基础用法';



export const Boundary: any = (args: any) => ({
  setup() {
    const rang = ref([1, 10000]);
    return () => {
      return (
        <div>
          <InputNumberRange v-model={[rang.value, 'value']} minValue={0} maxValue={1000}></InputNumberRange>
          <br />
          <p>当前值：{JSON.stringify(rang.value)}</p>
        </div>
      );
    };
  },
});

Boundary.storyName = '设置边界';

