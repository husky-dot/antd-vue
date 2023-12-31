import { PropType, defineComponent, watch, reactive } from 'vue';
import VideoUploader, { VideoFile, VideoUploaderProps } from '../VideoUploader';

const { value, onChange, ...videoUploaderProps } = VideoUploaderProps;

export const URLVideoUploaderProps = {
  ...videoUploaderProps,
  value: {
    type: Array as PropType<string[]>,
    default: [],
  },
  withMetadata: {
    type: Boolean,
    default: false,
  },
  onChange: Function as PropType<(files: string[]) => void>,
};

const urlsToImages = (urls: string[]) => {
  return urls.map(
    (url, index): VideoFile => {
      return {
        id: String(index),
        uid: String(index),
        name: url,
        size: 0,
        type: '',
        status: 'done',
        thumbUrl:
          url.indexOf('?') >= 0
            ? url.replace(/\?.*/, '?vframe/jpg/offset/1')
            : `${url}?vframe/jpg/offset/1`,
        url,
        width: 0,
        height: 0,
        duration: 0,
        bitrate: 0,
      };
    },
  );
};

export default defineComponent({
  name: 'TQuURLVideoUploader',
  props: URLVideoUploaderProps,
  emits: ['update:value'],
  setup(props, { emit, slots }) {
    const state = reactive({
      current: props.value,
      images: urlsToImages(props.value),
    });
    watch(
      () => props.value,
      () => {
        if (props.value !== state.current) {
          state.images = urlsToImages(props.value);
          state.current = props.value;
        }
      },
    );
    const handleChange = (files: VideoFile[], file: VideoFile) => {
      state.images = files;
      if (file.status === 'done' || file.status === 'removed') {
        const urls = files
          .filter((file) => file.status === 'done' && file.url)
          .map((file) => {
            if (
              props.withMetadata &&
              file.url?.indexOf('w=') < 0 &&
              file.width > 0 &&
              file.height > 0
            ) {
              return `${file.url}${file.url.indexOf('?') >= 0 ? '&' : '?'}w=${
                file.width
              }&h=${file.height}`;
            }
            return file.url;
          });
        state.current = urls;
        emit('update:value', urls);
        if (props.onChange) {
          props.onChange(urls);
        }
      }
    };
    return () => {
      const { value, withMetadata, onChange, ...restProps } = props;
      return (
        <VideoUploader
          {...restProps}
          directory={false}
          multiple={false}
          errorReserve={false}
          value={state.images}
          onChange={handleChange}
          v-slots={slots}
        />
      );
    };
  },
});
