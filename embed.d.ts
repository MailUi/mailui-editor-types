/// <reference types="react" />

declare module "engine/config/offline" {
    export function enableOffline(): void;

    export function isOffline(): boolean;
}
declare module "engine/config/callbacks" {
    export type CallbackDoneFn = (result: any) => Promise<void> | void;
    export type CallbackFn = (data?: any, done?: CallbackDoneFn) => Promise<void> | void;
    export type CallbackMap = {
        [name: string]: CallbackFn | undefined;
    };

    export function getCallback(type: string): CallbackFn;
    export function hasCallback(type: string): boolean;
    export function registerCallback(type: string, callback: CallbackFn | null | undefined): void;
    export function unregisterCallback(type: string): void;
    export function triggerCallback(type: string, ...args: [...any[], CallbackDoneFn]): void;

    export function onRegisterCallback(handler: {
        type: string;
        callback: CallbackFn;
    }): {
        remove: () => void;
    };

    export function onTriggerCallback(handler: {
        type: string;
        callback: CallbackFn;
    }): {
        remove: () => void;
    };

    export function onUnregisterCallback(handler: {
        type: string;
    }): {
        remove: () => void;
    };
}
declare module "engine/config/fonts" {
    export interface FontVariants {
        label: string;
        value: string;
    }

    export type FontVariantsList = FontVariants[];

    export interface Font {
        family: string;
        fallbackTo?: string;
        variants?: FontVariantsList;
        url?: string;
    }

    export type FontList = Font[];

    export interface FontConfig {
        showDefaultFonts?: boolean;
        customFonts?: FontList;
    }

    export interface FontOptions {
        showCustomFonts?: boolean;
        showGlobalFont?: boolean;
    }

    export function loadFontConfig(newFontConfig?: FontConfig): void;

    export function disableBuiltinFonts(): void;

    export function setFonts(newFonts?: FontList): void;

    export function getFonts(options?: FontOptions): FontList;

    export function getFontsVersion(): number; //

    export function getCustomFontsCount(): number;

    // export const defaultFontWeights: number[];
}
declare module "engine/config/intl" {
    export type Locale = 'en-US';
    export type TextDirection = 'ltr' | 'rtl';
    export const DEFAULT_LOCALE = "en-US";
    export const RTL_COUNTRIES: string[];

    export function getLocale(): Locale;

    export function setLocale(locale: Locale | null): void;

    export function getTextDirection(): TextDirection | undefined;

    export function getTextDirectionForLocale(locale: Locale): TextDirection | undefined;

    export function setTextDirection(textDirection: TextDirection | null): void;

    export function isRTL(locale: Locale): boolean;
}
declare module "editor/components/editors/types" {
    import {AppearanceConfig, Device, DisplayMode, Variant} from 'state/types/index';
    export type LoadingState = 'not-loaded' | 'loading' | 'loaded';
    export type UpdatingState = 'updating' | undefined;
    export type DeletionState = 'deleting' | 'failed' | undefined;

    export interface EditorProps<Value> {
        value: Value | undefined;
        defaultValue: Value | undefined;
        updateValue: (newValue: Value | undefined, data?: object, options?: {
            deviceOverride?: Device;
            skipFromUndoRedo?: boolean;
        }) => void;
        name: string;
        data?: object;
        displayMode: DisplayMode;
        label?: string;
        location: Location;
        values: {
            [key: string]: unknown;
            containerPadding?: string;
        };
        rootValues: {
            [key: string]: any;
            _override?: {
                [key: string]: any;
            };
        };
        appearance: AppearanceConfig;
        entitlements: {
            audit?: boolean;
            branding?: boolean;
            customFonts?: boolean;
            userUploads?: boolean;
            stockImages?: boolean;
        };
        item: object;
        project: object;
        onImageClick?: (url: string) => void;
    }

    export type HeadArguments = [
        Record<string, any>,
        Record<string, any>,
        {
            displayMode: DisplayMode;
            embeddedValues: Record<string, any>;
            isViewer: boolean;
            variant: Variant;
            type?: string;
        }
    ];

    export type DeepPartial<T> = T extends object ? {
        [P in keyof T]?: DeepPartial<T[P]>;
    } : T;
}
declare module "state/types/index" {
    import {ReactNode} from 'react';
    export type DesignMode = 'live' | 'edit';
    export type DisplayMode = 'email' | 'web';
    export type Variant = 'amp' | null;
    export type Device = 'desktop' | 'mobile' | 'tablet';
    export type Theme = 'light' | 'dark';
    export type Ui = 'none' | 'visual' | 'classic';
    export type RootElementTypes = 'SECTION' | 'ROW' | 'COLUMN' | 'ELEMENT' | string;
    export type ElementTypes =
        'section'
        | 'row'
        | 'column'
        | 'element'
        | 'text'
        | 'heading'
        | 'image'
        | 'button'
        | 'html'
        | 'socialIcon'
        | 'divider'
        | 'space'
        | 'icons'
        | string;

    export interface MergeTag {
        label: string;
        value?: string;
        margeTags?: MergeTags
    }

    export type MergeTags = MergeTag[]

    export type MergeTagsValues = Record<string, string | number | Record<string, boolean | Array<Record<string, string | number>>>>;

    export interface CustomFont {
        label: string;
        value: string;
        url: string;
        weights?: number[];
    }

    export interface CustomFonts {
        [label: string]: CustomFont;
    }

    export type DesignTag = string;

    export interface Translations {
        [name: string]: object;
    }

    export type ImageSource = 'unsplash' | 'pixabay' | 'pexel' | 'user';

    export interface Image {
        id: number;
        location: string;
        contentType: string;
        size: number;
        width: number | null;
        height: number | null;
        source: ImageSource | null;
        optimistic?: boolean;
    }


    export interface Element {
        id: string;
        _elType: RootElementTypes;
        name?: string;
        type: ElementTypes;
        componentPath?: string;
        elements?: ElementList;
        style?: object;
        media?: object;
        attr?: object;
        wrapper?: object;
        innerWrapper?: object;
    }

    export type ElementList = Element[];

    export interface PageData {
        style?: any[];
        heading?: any[];
        settings?: object;
        elements?: ElementList;
    }

    export interface Page {
        id: string;
        slug: string | null;
        name?: string | null;
        type?: 'INDEX' | string | null;
        data?: PageData;
    }

    export type PageList = Page[];

    export type JSONTemplate = {
        name: string
        siteId: string
        global: object
        pages: PageList;
        schemaVersion?: string
    };

    export type ArrayItem<T> = T extends (infer I)[] ? I : T extends readonly (infer I)[] ? I : unknown;
    export type Fonts = {
        showDefaultFonts?: boolean;
        customFonts?: CustomFont[];
    };
    export type SocialIcon = {
        name: string;
        url: string;
        imgUrl?: string;
    };
    export type SocialCustomIcon = {
        name: string;
        url: string;
        icons: {
            [key: string]: string;
        }[];
    };
    export type AppearanceConfig = {
        theme?: Theme;
        panels?: {
            tools?: {
                dock?: 'left' | 'right'; // popup
                collapsible?: boolean;
                compact?: boolean
            };
        };
        features?: {
            preview?: boolean;
        };
    };

    export interface ToolConfig {
        enabled?: boolean | undefined;
        icon?: ReactNode | undefined;
        label?: string | undefined;
        position?: number | undefined;
        // properties?: object | undefined;
    }

    export interface ToolsConfig {
        [key: string]: ToolConfig;
    }

    export type User = {
        id?: string | number;
        name?: string | null | undefined;
        avatar?: string | null | undefined;
        email?: string;
        signature?: string;
    };
}
declare module "embed/Config" {
    import {ValidationResult} from 'amphtml-validator';
    import {FontList} from "engine/config/fonts";
    import {TextDirection} from "engine/config/intl";
    import {
        AppearanceConfig,
        Device,
        DisplayMode,
        Fonts,
        JSONTemplate,
        MergeTags,
        MergeTagsValues,
        ToolsConfig,
        User
    } from "state/types/index";

    export interface Config {
        apiKey?: string;
        apiSecret?: string;
        id?: string;
        className?: string;
        version?: string;
        source?: {
            name: string;
            version: string;
        };
        offline?: boolean;
        render?: boolean;
        amp?: boolean;
        defaultDevice?: Device;
        devices?: Device[];
        // designId?: string;
        // designMode?: string;
        displayMode?: DisplayMode;
        env?: Record<'API_V1_BASE_URL' | 'API_V2_BASE_URL' | 'EVENTS_API_BASE_URL' | 'TOOLS_API_V1_BASE_URL' | 'TOOLS_CDN_BASE_URL', string | undefined>;
        projectId?: number | null;
        user?: User;
        templateId?: number;
        stockTemplateId?: string;
        loadTimeout?: number;
        tools?: ToolsConfig;
        excludeTools?: string[];
        editor?: object;
        fonts?: Fonts;
        mergeTags?: MergeTags;
        locale?: string;
        textDirection?: TextDirection;
        translations?: object;
        appearance?: AppearanceConfig;
        features?: object;
    }

    export interface SaveDesignOptions {
    }

    export interface ExportHtmlOptions {
        amp?: boolean;
        cleanup?: boolean;
        textDirection?: TextDirection;
        isPreview?: boolean;
        live?: boolean;
        mergeTags?: MergeTagsValues;
        minify?: boolean;
        popupId?: string;
        title?: string;
        validateAmp?: boolean;
        onlyHeader?: boolean;
        onlyFooter?: boolean;
    }

    export interface SaveDesignResult {

    }

    export interface ExportHtmlResult {
        html: string;
        amp: {
            enabled: boolean;
            format: 'AMP' | 'AMP4EMAIL';
            html: string | undefined;
            validation: ValidationResult;
        };
        chunks: ExportChunksResult;
        design: JSONTemplate;
    }

    export interface ExportLiveHtmlOptions extends Omit<ExportHtmlOptions, 'live'> {
    }

    export interface ExportLiveHtmlResult extends ExportHtmlResult {
    }

    export interface ExportPlainTextOptions extends Omit<ExportHtmlOptions, 'cleanup' | 'minify'> {
        ignorePreheader?: boolean;
    }

    export interface ExportPlainTextResult {
        text: string;
        design: JSONTemplate;
    }

    export interface HtmlToPlainTextOptions {
        ignoreLinks?: boolean;
        ignoreImages?: boolean;
    }

    export interface ExportChunksResult {
        css: string;
        js: string;
        tags: string[];
        fonts: FontList;
        body: any;
    }

    export interface ExportPlainTextOptions {
        ignoreLinks?: boolean;
        ignoreImages?: boolean;
        ignorePreheader?: boolean;
        mergeTags?: Record<string, string>;
    }

    export interface ExportFromApiResult {
        design: JSONTemplate;
        url: string | null;
        error?: string;
    }

    interface BaseExportFromApiOptions {
        mergeTags?: Record<string, string>;
    }

    export interface ExportImageFromApiOptions extends BaseExportFromApiOptions {
        width?: number;
        height?: number;
        fullPage?: boolean;
        deviceScaleFactor?: number;
    }

    export interface ExportPdfFromApiOptions extends BaseExportFromApiOptions {}
    export interface ExportZipFromApiOptions extends BaseExportFromApiOptions {}
}
declare module "engine/utils/findDeep" {
    export function findDeep<T = any>(item: Record<string, T> | Array<T> | T, eq: ((item: T) => boolean) | unknown, {_path, _visited}?: {
        _path?: string[];
        _visited?: WeakMap<object, any>;
    }): string[][];
}
declare module "embed/Frame" {
    export type Message = object;

    export interface MessageData {
        action: string;
        callbackId: number;
        doneId: number;
        result: unknown | undefined;
        resultArgs: unknown[] | undefined;
    }

    export class Frame {
        id: number;
        ready: boolean;
        iframe: HTMLIFrameElement | undefined;
        messages: any[];
        callbackId: number;
        callbacks: {
            [key: number]: Function | undefined;
        };
        destroy: () => void;
        onWindowMessage: (event: MessageEvent<any>) => void;

        constructor(src: string);

        createIframe(src: string): HTMLIFrameElement;
        appendTo(el: Element): void;
        postMessage(action: string, message: Message): void;
        withMessage(action: string, message: Message | undefined, callback?: Function): void;
        _preprocessMessageFunctions(message: Message): Message;
        preprocessMessage(message: Message): Message;
        scheduleMessage(message: Message): void;
        flushMessages(): void;
        handleMessage({action, callbackId, doneId, result: _result, resultArgs: _resultArgs,}: MessageData): void;
        receiveMessage(event: any): void;
    }

    export const disableMultipleEditors: () => void;
    export const disableOriginalFunctionReferences: () => void;
    global {
        interface Window {
            __mailui_newEditorId: number;
        }
    }
}
declare module "engine/config/env" {
    export const env: {
        API_V1_BASE_URL: string;
        API_V2_BASE_URL: string;
        EVENTS_API_BASE_URL: string;
        TOOLS_API_V1_BASE_URL: string;
        TOOLS_CDN_BASE_URL: string;
    };

    export function setIsTest(isTest: boolean): void;
    export function isTest(): boolean;

    global {
        interface Window {
            Cypress?: unknown;
        }
    }
}

declare module "editor/hooks/useTranslate" {

    export function useBrowserUtils(): any;

    // export function withConfig<C extends React.ComponentType>(Component: C): React.MemoExoticComponent<React.ForwardRefExoticComponent<object & Record<"config", any> & React.RefAttributes<unknown>>>;
}

// declare module "editor/hooks/withTranslate" {
//     import React from 'react';
//
//     export function withConfig<C extends React.ComponentType>(Component: C): React.MemoExoticComponent<React.ForwardRefExoticComponent<object & Record<"translate", any> & React.RefAttributes<unknown>>>;
// }


declare module "embed/Editor" {
    import {Frame} from "embed/Frame";
    import {
        Config,
        ExportFromApiResult,
        ExportHtmlOptions,
        ExportHtmlResult,
        ExportImageFromApiOptions,
        ExportLiveHtmlOptions,
        ExportLiveHtmlResult,
        ExportPdfFromApiOptions,
        ExportPlainTextOptions,
        ExportPlainTextResult,
        ExportZipFromApiOptions,
        SaveDesignOptions
    } from "embed/Config";
    import {
        AppearanceConfig,
        Device,
        DisplayMode,
        JSONTemplate,
        MergeTags,
        Translations,
        User
    } from "state/types/index";
    import {Locale, TextDirection} from "engine/config/intl";
    export const LATEST_VERSION: string;
    export const STABLE_VERSION: string;

    export class Editor {
        frame: Frame | null;
        version: string | undefined;

        constructor(config?: Config);

        init(config?: Config): void;
        destroy(): void;
        loadEditor(config: Config): void;
        renderEditor(config: Config): void;
        initEditor(config: Config): void;
        registerColumns(cells: number[]): void;
        registerCallback(type: string, callback: Function): void;
        unregisterCallback(type: string): void;
        registerProvider(type: string, callback: Function): void;
        unregisterProvider(type: string): void;
        reloadProvider(type: string): void;
        addEventListener(type: string, callback: Function): void;
        removeEventListener(type: string): void;
        setDisplayMode(displayMode: DisplayMode): void;
        loadProject(projectId: number): void;
        loadUser(user: User): void;
        loadTemplate(templateId: number): void;
        loadStockTemplate(stockTemplateId: string): void;
        setMergeTags(mergeTags: MergeTags): void;
        setDevice(device: string): void;
        setLocale(locale: Locale | null): void;
        setTextDirection(textDirection: TextDirection | null): void;
        setTranslations(translations: Translations): void;
        loadBlank(bodyValues?: object): void;
        loadDesign(design: JSONTemplate): void;
        saveDesign(callback: (data: SaveDesignResult) => void, options?: SaveDesignOptions): void;
        exportHtml(callback: (data: ExportHtmlResult) => void, options?: ExportHtmlOptions): void;
        exportLiveHtml(callback: (data: ExportLiveHtmlResult) => void, options?: ExportLiveHtmlOptions): void;
        exportPlainText(callback: (data: ExportPlainTextResult) => void, options?: ExportPlainTextOptions): void;
        exportImage(callback: (data: ExportFromApiResult) => void, options?: ExportImageFromApiOptions): void;
        exportPdf(callback: (data: ExportFromApiResult) => void, options?: ExportPdfFromApiOptions): void;
        exportZip(callback: (data: ExportFromApiResult) => void, options?: ExportZipFromApiOptions): void;
        setAppearance(appearance: AppearanceConfig): void;
        showPreview(device?: Device): void;
        hidePreview(): void;
        canUndo(callback: (result: boolean) => void): void;
        canRedo(callback: (result: boolean) => void): void;
        undo(): void;
        redo(): void;
    }
}
declare module "embed/index" {
    import {Editor} from "embed/Editor";
    import {Config} from "embed/Config";

    class Embed extends Editor {
        createEditor(config: Config): Editor;
    }

    const _default: Embed;
    export default _default;
}