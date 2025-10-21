declare module '@stagewise/toolbar-react' {
  export interface StagewiseToolbarProps {
    config?: {
      plugins?: any[];
    };
  }
  
  export const StagewiseToolbar: React.FC<StagewiseToolbarProps>;
}