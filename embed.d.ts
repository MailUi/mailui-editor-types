/// <reference types="react" />

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

declare module "state/types/index" {
    import {ReactNode} from 'react';
    export type DisplayMode = 'email' | 'web';
    // export type Variant = 'amp' | null;
    export type Device = 'desktop' | 'mobile' | 'tablet';
    export type Theme = 'light' | 'dark';
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
        | 'card'
        | 'countdown'
        | string;

    export interface MergeTag {
        label: string;
        value?: string;
        margeTags?: MergeTags[]
    }

    export interface MergeTags {
        [name: string]: MergeTag;
    }

    export type MergeTagsValues = Record<string, string | number | Record<string, boolean | Array<Record<string, string | number>>>>;

    export type SpecialLink = {
        name: string;
        href: string;
        target?: string;
        specialLinks?: SpecialLinks[];
    };
    export interface SpecialLinks {
        [name: string]: SpecialLink;
    }

    export type SpecialLinksValues = Record<string, string | number | Record<string, boolean | Array<Record<string, string | number>>>>;

    export interface Translations {
        [name: string]: object;
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
        elements?: ElementList | [];
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

    export interface ToolBadge {
        label: string;
        variant?: 'warning' | 'info' | 'danger' | 'dark' | string;
    }

    export interface ToolConfig {
        enabled?: boolean | undefined;
        icon?: ReactNode | undefined;
        label?: string | undefined;
        position?: number | undefined;
        badges?: ToolBadge[]
    }

    export interface ToolsConfig {
        [key: string]: ToolConfig;
    }
}

declare module "embed/Config" {
    import {TextDirection} from "engine/config/intl";
    import {
        AppearanceConfig,
        Device,
        DisplayMode,
        JSONTemplate,
        MergeTags,
        SpecialLinks,
        MergeTagsValues,
        SpecialLinksValues,
        ToolsConfig,
    } from "state/types/index";

    export interface Config {
        signature?: string;
        id?: string;
        className?: string;
        defaultDevice?: Device;
        devices?: Device[];
        displayMode?: DisplayMode;
        templateId?: number;
        stockTemplateId?: string;
        loadTimeout?: number;
        tools?: ToolsConfig;
        excludeTools?: string[];
        protectedModules?: string[];
        editor?: object;
        mergeTags?: MergeTags;
        specialLinks?: SpecialLinks;
        locale?: string;
        textDirection?: TextDirection;
        translations?: object;
        appearance?: AppearanceConfig;
        features?: object;
    }

    export interface SaveDesignOptions {}

    export interface ExportHtmlOptions {
        amp?: boolean;
        cleanup?: boolean;
        textDirection?: TextDirection;
        isPreview?: boolean;
        mergeTags?: MergeTagsValues;
        specialLinks?: SpecialLinksValues;
        minify?: boolean;
        title?: string;
        validateAmp?: boolean;
        onlyHeader?: boolean;
        onlyFooter?: boolean;
    }

    export interface SaveDesignResult {
        version: string;
        json: JSONTemplate;
        html: string;
    }

    export interface FetchInitialDesignResult {
        version: string;
        json: JSONTemplate;
    }

    export interface ExportJsonResult {
        json: JSONTemplate;
    }

    export interface ExportHtmlResult {
        html: string;
        // amp: {
        //     enabled: boolean;
        //     format: 'AMP' | 'AMP4EMAIL';
        //     html: string | undefined;
        //     validation: ValidationResult;
        // };
        chunks: ExportChunksResult;
        design: JSONTemplate;
    }

    // export interface ExportPlainTextOptions extends Omit<ExportHtmlOptions, 'cleanup' | 'minify'> {
    //     ignorePreheader?: boolean;
    // }

    export interface ExportPlainTextResult {
        text: string;
        json: JSONTemplate;
    }

    export interface ExportChunksResult {
        css: string;
        js: string;
        tags: string[];
        body: any;
    }

    export interface ExportPlainTextOptions {
        ignoreLinks?: boolean;
        ignoreImages?: boolean;
        ignorePreheader?: boolean;
        mergeTags?: Record<string, string>;
    }

    export interface ExportFromApiResult {
        json: JSONTemplate;
        error?: string;
    }

    interface BaseExportFromApiOptions {
        mergeTags?: Record<string, string>;
    }

    export interface FetchInitialDesignOptions {

    }

    export interface ExportJsonOptions {

    }

    export interface ExportImageFromApiOptions extends BaseExportFromApiOptions {
        width?: number;
        height?: number;
        fullPage?: boolean;
        deviceScaleFactor?: number;
    }

    export interface ExportPdfFromApiOptions extends BaseExportFromApiOptions {}
    export interface ExportZipFromApiOptions extends BaseExportFromApiOptions {}
    export interface ExportEspsFromApiOptions extends BaseExportFromApiOptions {}
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

declare module "editor/hooks/useTranslate" {

    export function useBrowserUtils(): any;

}

declare module "embed/Editor" {
    import {Frame} from "embed/Frame";
    import {
        Config,
        SaveDesignResult,
        ExportFromApiResult,
        ExportHtmlOptions,
        ExportJsonResult,
        ExportHtmlResult,
        ExportJsonOptions,
        FetchInitialDesignResult,
        ExportImageFromApiOptions,
        ExportPdfFromApiOptions,
        ExportPlainTextOptions,
        ExportPlainTextResult,
        ExportZipFromApiOptions,
        SaveDesignOptions,
        FetchInitialDesignOptions,
        ExportEspsFromApiOptions
    } from "embed/Config";
    import {
        AppearanceConfig,
        DisplayMode,
        JSONTemplate,
        MergeTags,
        Translations,
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
        fetchInitialDesign(callback: (data: FetchInitialDesignResult) => void, options?: FetchInitialDesignOptions): void;
        exportJson(callback: (data: ExportJsonResult) => void, options?: ExportJsonOptions): void;
        exportHtml(callback: (data: ExportHtmlResult) => void, options?: ExportHtmlOptions): void;
        exportPlainText(callback: (data: ExportPlainTextResult) => void, options?: ExportPlainTextOptions): void;
        exportImage(callback: (data: ExportFromApiResult) => void, options?: ExportImageFromApiOptions): void;
        exportPdf(callback: (data: ExportFromApiResult) => void, options?: ExportPdfFromApiOptions): void;
        exportZip(callback: (data: ExportFromApiResult) => void, options?: ExportZipFromApiOptions): void;
        exportEsps(callback: (data: ExportFromApiResult) => void, options?: ExportEspsFromApiOptions): void;
        setAppearance(appearance: AppearanceConfig): void;
        showPreview(): void;
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