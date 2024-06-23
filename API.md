# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### AppState <a name="AppState" id="cdk-arch.AppState"></a>

#### Initializer <a name="Initializer" id="cdk-arch.AppState.Initializer"></a>

```typescript
import { AppState } from 'cdk-arch'

const appState: AppState = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.AppState.property.gridSize">gridSize</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.AppState.property.viewBackgroundColor">viewBackgroundColor</a></code> | <code>string</code> | *No description.* |

---

##### `gridSize`<sup>Required</sup> <a name="gridSize" id="cdk-arch.AppState.property.gridSize"></a>

```typescript
public readonly gridSize: number;
```

- *Type:* number

---

##### `viewBackgroundColor`<sup>Required</sup> <a name="viewBackgroundColor" id="cdk-arch.AppState.property.viewBackgroundColor"></a>

```typescript
public readonly viewBackgroundColor: string;
```

- *Type:* string

---

### Data <a name="Data" id="cdk-arch.Data"></a>

#### Initializer <a name="Initializer" id="cdk-arch.Data.Initializer"></a>

```typescript
import { Data } from 'cdk-arch'

const data: Data = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.Data.property.appState">appState</a></code> | <code><a href="#cdk-arch.AppState">AppState</a></code> | *No description.* |
| <code><a href="#cdk-arch.Data.property.elements">elements</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#cdk-arch.Data.property.source">source</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.Data.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.Data.property.version">version</a></code> | <code>number</code> | *No description.* |

---

##### `appState`<sup>Required</sup> <a name="appState" id="cdk-arch.Data.property.appState"></a>

```typescript
public readonly appState: AppState;
```

- *Type:* <a href="#cdk-arch.AppState">AppState</a>

---

##### `elements`<sup>Required</sup> <a name="elements" id="cdk-arch.Data.property.elements"></a>

```typescript
public readonly elements: any[];
```

- *Type:* any[]

---

##### `source`<sup>Required</sup> <a name="source" id="cdk-arch.Data.property.source"></a>

```typescript
public readonly source: string;
```

- *Type:* string

---

##### `type`<sup>Required</sup> <a name="type" id="cdk-arch.Data.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `version`<sup>Required</sup> <a name="version" id="cdk-arch.Data.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

---

### ExcaliDrawPrimitiveProps <a name="ExcaliDrawPrimitiveProps" id="cdk-arch.ExcaliDrawPrimitiveProps"></a>

#### Initializer <a name="Initializer" id="cdk-arch.ExcaliDrawPrimitiveProps.Initializer"></a>

```typescript
import { ExcaliDrawPrimitiveProps } from 'cdk-arch'

const excaliDrawPrimitiveProps: ExcaliDrawPrimitiveProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.groupIds">groupIds</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.height">height</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.width">width</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.x">x</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps.property.y">y</a></code> | <code>number</code> | *No description.* |

---

##### `groupIds`<sup>Optional</sup> <a name="groupIds" id="cdk-arch.ExcaliDrawPrimitiveProps.property.groupIds"></a>

```typescript
public readonly groupIds: string[];
```

- *Type:* string[]

---

##### `height`<sup>Optional</sup> <a name="height" id="cdk-arch.ExcaliDrawPrimitiveProps.property.height"></a>

```typescript
public readonly height: number;
```

- *Type:* number

---

##### `type`<sup>Optional</sup> <a name="type" id="cdk-arch.ExcaliDrawPrimitiveProps.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `width`<sup>Optional</sup> <a name="width" id="cdk-arch.ExcaliDrawPrimitiveProps.property.width"></a>

```typescript
public readonly width: number;
```

- *Type:* number

---

##### `x`<sup>Optional</sup> <a name="x" id="cdk-arch.ExcaliDrawPrimitiveProps.property.x"></a>

```typescript
public readonly x: number;
```

- *Type:* number

---

##### `y`<sup>Optional</sup> <a name="y" id="cdk-arch.ExcaliDrawPrimitiveProps.property.y"></a>

```typescript
public readonly y: number;
```

- *Type:* number

---

## Classes <a name="Classes" id="Classes"></a>

### ExcaliDrawPrimitive <a name="ExcaliDrawPrimitive" id="cdk-arch.ExcaliDrawPrimitive"></a>

#### Initializers <a name="Initializers" id="cdk-arch.ExcaliDrawPrimitive.Initializer"></a>

```typescript
import { ExcaliDrawPrimitive } from 'cdk-arch'

new ExcaliDrawPrimitive(args: ExcaliDrawPrimitiveProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.Initializer.parameter.args">args</a></code> | <code><a href="#cdk-arch.ExcaliDrawPrimitiveProps">ExcaliDrawPrimitiveProps</a></code> | *No description.* |

---

##### `args`<sup>Required</sup> <a name="args" id="cdk-arch.ExcaliDrawPrimitive.Initializer.parameter.args"></a>

- *Type:* <a href="#cdk-arch.ExcaliDrawPrimitiveProps">ExcaliDrawPrimitiveProps</a>

---



#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.angle">angle</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.boundElements">boundElements</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.frameId">frameId</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.groupIds">groupIds</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.height">height</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.isDeleted">isDeleted</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.link">link</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.locked">locked</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.seed">seed</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.type">type</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.updated">updated</a></code> | <code>boolean</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.version">version</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.versionNonce">versionNonce</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.width">width</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.x">x</a></code> | <code>number</code> | *No description.* |
| <code><a href="#cdk-arch.ExcaliDrawPrimitive.property.y">y</a></code> | <code>number</code> | *No description.* |

---

##### `angle`<sup>Required</sup> <a name="angle" id="cdk-arch.ExcaliDrawPrimitive.property.angle"></a>

```typescript
public readonly angle: number;
```

- *Type:* number

---

##### `boundElements`<sup>Required</sup> <a name="boundElements" id="cdk-arch.ExcaliDrawPrimitive.property.boundElements"></a>

```typescript
public readonly boundElements: string[];
```

- *Type:* string[]

---

##### `frameId`<sup>Required</sup> <a name="frameId" id="cdk-arch.ExcaliDrawPrimitive.property.frameId"></a>

```typescript
public readonly frameId: number;
```

- *Type:* number

---

##### `groupIds`<sup>Required</sup> <a name="groupIds" id="cdk-arch.ExcaliDrawPrimitive.property.groupIds"></a>

```typescript
public readonly groupIds: string[];
```

- *Type:* string[]

---

##### `height`<sup>Required</sup> <a name="height" id="cdk-arch.ExcaliDrawPrimitive.property.height"></a>

```typescript
public readonly height: number;
```

- *Type:* number

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-arch.ExcaliDrawPrimitive.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `isDeleted`<sup>Required</sup> <a name="isDeleted" id="cdk-arch.ExcaliDrawPrimitive.property.isDeleted"></a>

```typescript
public readonly isDeleted: boolean;
```

- *Type:* boolean

---

##### `link`<sup>Required</sup> <a name="link" id="cdk-arch.ExcaliDrawPrimitive.property.link"></a>

```typescript
public readonly link: string;
```

- *Type:* string

---

##### `locked`<sup>Required</sup> <a name="locked" id="cdk-arch.ExcaliDrawPrimitive.property.locked"></a>

```typescript
public readonly locked: boolean;
```

- *Type:* boolean

---

##### `seed`<sup>Required</sup> <a name="seed" id="cdk-arch.ExcaliDrawPrimitive.property.seed"></a>

```typescript
public readonly seed: number;
```

- *Type:* number

---

##### `type`<sup>Required</sup> <a name="type" id="cdk-arch.ExcaliDrawPrimitive.property.type"></a>

```typescript
public readonly type: string;
```

- *Type:* string

---

##### `updated`<sup>Required</sup> <a name="updated" id="cdk-arch.ExcaliDrawPrimitive.property.updated"></a>

```typescript
public readonly updated: boolean;
```

- *Type:* boolean

---

##### `version`<sup>Required</sup> <a name="version" id="cdk-arch.ExcaliDrawPrimitive.property.version"></a>

```typescript
public readonly version: number;
```

- *Type:* number

---

##### `versionNonce`<sup>Required</sup> <a name="versionNonce" id="cdk-arch.ExcaliDrawPrimitive.property.versionNonce"></a>

```typescript
public readonly versionNonce: number;
```

- *Type:* number

---

##### `width`<sup>Required</sup> <a name="width" id="cdk-arch.ExcaliDrawPrimitive.property.width"></a>

```typescript
public readonly width: number;
```

- *Type:* number

---

##### `x`<sup>Required</sup> <a name="x" id="cdk-arch.ExcaliDrawPrimitive.property.x"></a>

```typescript
public readonly x: number;
```

- *Type:* number

---

##### `y`<sup>Required</sup> <a name="y" id="cdk-arch.ExcaliDrawPrimitive.property.y"></a>

```typescript
public readonly y: number;
```

- *Type:* number

---


### SketchBuilder <a name="SketchBuilder" id="cdk-arch.SketchBuilder"></a>

#### Initializers <a name="Initializers" id="cdk-arch.SketchBuilder.Initializer"></a>

```typescript
import { SketchBuilder } from 'cdk-arch'

new SketchBuilder()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-arch.SketchBuilder.addElement">addElement</a></code> | *No description.* |
| <code><a href="#cdk-arch.SketchBuilder.exportToFile">exportToFile</a></code> | *No description.* |

---

##### `addElement` <a name="addElement" id="cdk-arch.SketchBuilder.addElement"></a>

```typescript
public addElement(element: ExcaliDrawPrimitive): string
```

###### `element`<sup>Required</sup> <a name="element" id="cdk-arch.SketchBuilder.addElement.parameter.element"></a>

- *Type:* <a href="#cdk-arch.ExcaliDrawPrimitive">ExcaliDrawPrimitive</a>

---

##### `exportToFile` <a name="exportToFile" id="cdk-arch.SketchBuilder.exportToFile"></a>

```typescript
public exportToFile(savePath: string): void
```

###### `savePath`<sup>Required</sup> <a name="savePath" id="cdk-arch.SketchBuilder.exportToFile.parameter.savePath"></a>

- *Type:* string

---


#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-arch.SketchBuilder.property.data">data</a></code> | <code><a href="#cdk-arch.Data">Data</a></code> | *No description.* |
| <code><a href="#cdk-arch.SketchBuilder.property.drawObjs">drawObjs</a></code> | <code>any[]</code> | *No description.* |
| <code><a href="#cdk-arch.SketchBuilder.property.groups">groups</a></code> | <code>any[]</code> | *No description.* |

---

##### `data`<sup>Required</sup> <a name="data" id="cdk-arch.SketchBuilder.property.data"></a>

```typescript
public readonly data: Data;
```

- *Type:* <a href="#cdk-arch.Data">Data</a>

---

##### `drawObjs`<sup>Required</sup> <a name="drawObjs" id="cdk-arch.SketchBuilder.property.drawObjs"></a>

```typescript
public readonly drawObjs: any[];
```

- *Type:* any[]

---

##### `groups`<sup>Required</sup> <a name="groups" id="cdk-arch.SketchBuilder.property.groups"></a>

```typescript
public readonly groups: any[];
```

- *Type:* any[]

---



