import { Injectable } from '@angular/core';
import { Dictionary } from '../models/dictionary.model';

type Parameters = [string, string][];

@Injectable({
  providedIn: 'root'
})
export class PathInjectorService {

  constructor() { }

  injectPathParameters(path: string, inputParameters: Dictionary<any>) {
    const encodedParameters = this.getEncodedParameters(inputParameters);
    return this.getChangedPath(path, encodedParameters);
  }

  replaceAll(input: string, toReplace: string, replacement: string): string {
    return input.split(`:${toReplace}`).join(replacement);
  }

  getEncodedParameters(parameters: Dictionary<any>): Parameters {
    return Object.entries(parameters).map(([key, value]) => [key, encodeURIComponent(value)]);
  }

  getChangedPath(path: string, parameters: Parameters) {
    return parameters.reduce((previousPath, [key, value]) => this.replaceAll(previousPath, key, value), path);
  }
}
