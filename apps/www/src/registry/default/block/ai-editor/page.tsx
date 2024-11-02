import PlateEditor from '@/registry/default/block/ai-editor/components/editor/plate-editor';

export const description = 'An AI editor.';

export const iframeHeight = '650px';

export const containerClassName = 'w-full h-full';

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor />
    </div>
  );
}
