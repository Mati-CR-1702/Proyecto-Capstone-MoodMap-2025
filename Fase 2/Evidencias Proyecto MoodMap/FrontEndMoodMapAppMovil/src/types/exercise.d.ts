export interface ExerciseStep {
  step: number; 
  text: string;
  image?: any;
  timer: number;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: string;
  image: any;
  gif?: any;
  steps?: ExerciseStep[];
}
  