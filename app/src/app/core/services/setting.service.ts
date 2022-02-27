import { Injectable } from '@angular/core';
import { baseEnvironment } from 'src/environments/base-environment';
import { PathInjectorService } from './path-injector.service';

interface Module {
  prefix: string;
  calls: any;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private pathInjector: PathInjectorService) { }

  private readonly baseEnv = baseEnvironment;

  private get urls(): any {
    return this.baseEnv.urls;
  }

  private get baseUrl(): string {
    return this.baseEnv.apiUrl;
  }

  getUserUrl(action: string, parameters?: any): string {
    return this.getPath('user', action, parameters);
  }

  getGroupUrl(action: string, parameters?: any): string {
    return this.getPath('group', action, parameters);
  }

  getJourneyUrl(action: string, parameters?: any): string {
    return this.getPath('journey', action, parameters);
  }

  getAttractionUrl(action: string, parameters?: any): string {
    return this.getPath('attraction', action, parameters);
  }

  getFileUrl(action: string, parameters?: any): string {
    return this.getPath('file', action, parameters);
  }

  private getPath(moduleName: string, action: string, parameters?: any): string {
    return [this.baseUrl, this.getPrefixAndCall(moduleName, action, parameters)].join('/');
  }

  private getPrefixAndCall(moduleName: string, action: string, parameters?: any): string {
    const prefix = this.getPrefix(moduleName);
    let call = this.getCall(moduleName, action, parameters);
    return [prefix, call].join('/');
  }

  private getModule(moduleName: string): Module {
    return this.urls[moduleName] as Module;
  }

  private getPrefix(moduleName: string): string {
    return this.getModule(moduleName).prefix;
  }

  private getCall(moduleName: string, action: string, parameters?: any): string {
    const call = this.getModule(moduleName).calls[action];
    console.log(call);
    if(parameters) {
      return this.pathInjector.injectPathParameters(call, parameters);
    }
    return call;
  }
}
