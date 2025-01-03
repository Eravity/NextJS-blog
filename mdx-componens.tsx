interface MdxComponents {
  [key: string]: React.ComponentType<undefined>;
}

export function useMdxComponents(components: MdxComponents): MdxComponents {
  return {
    ...components,
  };
}