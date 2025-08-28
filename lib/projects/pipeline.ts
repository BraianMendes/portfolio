import type { Specification } from "@/lib/projects/specifications";

export interface PipelineStep<T> {
  apply(items: T[]): T[];
}

export class SpecificationStep<T> implements PipelineStep<T> {
  constructor(private readonly spec: Specification<T>) {}

  apply(items: T[]): T[] {
    return items.filter((i) => this.spec.isSatisfiedBy(i));
  }
}

export class SortStep<T> implements PipelineStep<T> {
  constructor(private readonly compare: (a: T, b: T) => number) {}

  apply(items: T[]): T[] {
    return [...items].sort(this.compare);
  }
}

export class Pipeline<T> {
  private steps: PipelineStep<T>[] = [];

  use(step: PipelineStep<T>) {
    this.steps.push(step);

    return this;
  }

  run(input: T[]): T[] {
    return this.steps.reduce((acc, step) => step.apply(acc), input);
  }
}
