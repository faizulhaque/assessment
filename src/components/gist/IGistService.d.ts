import { Gist } from "./models/Gist";

export class IGistService {
  getGistDataByUsername(username: string): Promise<Gist[]>;
}
