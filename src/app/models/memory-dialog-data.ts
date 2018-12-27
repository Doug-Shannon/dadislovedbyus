import { Memory } from './memory';
import { User } from './user';
import { Entry } from 'app/components/show/show.component';

export interface MemoryModalData {
  memories: Entry<Memory>[];
}
