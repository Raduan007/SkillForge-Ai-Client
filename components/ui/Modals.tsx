"use client";

import * as React from "react";
import { X, CheckCircle, AlertTriangle, AlertCircle, Image } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

// 1. BASE MODAL (Handles accessibility, ESC key, backdrop click, body overflow locks, animations)
export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  closeOnBackdrop?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  closeOnBackdrop = true,
}) => {
  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      {/* Backdrop Backdrop with Fade animation */}
      <div
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => closeOnBackdrop && onClose()}
      />

      {/* Modal Dialog Content Container with Scale-in animation */}
      <div
        className={cn(
          "relative z-popover w-full max-w-md rounded-xl bg-white border border-border-color p-6 shadow-2xl transition-all duration-300 transform scale-100",
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-secondary-text hover:bg-slate-50 hover:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {children}
      </div>
    </div>
  );
};

// 2. CONFIRMATION MODAL
export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isConfirming?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isConfirming = false,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-bold text-dark-text pr-6">{title}</h3>
        <p className="text-xs text-secondary-text leading-relaxed">{description}</p>
        
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" size="medium" onClick={onClose} disabled={isConfirming} className="text-xs font-semibold">
            {cancelLabel}
          </Button>
          <Button variant="primary" size="medium" onClick={onConfirm} isLoading={isConfirming} className="text-xs font-bold px-5">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};

// 3. DELETE MODAL (Destructive confirmation modal)
export interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  description?: string;
  deleteLabel?: string;
  cancelLabel?: string;
  isDeleting?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title = "Delete resource",
  description = "Are you sure you want to delete this resource? This action is permanent and cannot be undone.",
  deleteLabel = "Delete Permanent",
  cancelLabel = "Cancel",
  isDeleting = false,
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex gap-4">
        {/* Warning Icon Banner */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" />
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-base font-bold text-dark-text leading-snug">{title}</h3>
          <p className="text-xs text-secondary-text leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" size="medium" onClick={onClose} disabled={isDeleting} className="text-xs font-semibold">
          {cancelLabel}
        </Button>
        <Button variant="danger" size="medium" onClick={onDelete} isLoading={isDeleting} className="text-xs font-bold px-5">
          {deleteLabel}
        </Button>
      </div>
    </BaseModal>
  );
};

// 4. SUCCESS MODAL
export interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  actionLabel?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  actionLabel = "Done",
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-secondary mb-4 animate-pulse-glow">
          <CheckCircle className="h-6 w-6" />
        </div>

        <h3 className="text-base font-bold text-dark-text mb-2">{title}</h3>
        <p className="text-xs text-secondary-text max-w-xs leading-relaxed mb-6">
          {description}
        </p>

        <Button variant="primary" size="medium" onClick={onClose} className="w-full text-xs font-bold">
          {actionLabel}
        </Button>
      </div>
    </BaseModal>
  );
};

// 5. ERROR MODAL
export interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actionLabel?: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = "Action failed",
  description = "We encountered a temporary network validation issue. Please check your data fields and try again.",
  actionLabel = "Close",
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center p-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 mb-4 animate-pulse">
          <AlertCircle className="h-6 w-6" />
        </div>

        <h3 className="text-base font-bold text-dark-text mb-2">{title}</h3>
        <p className="text-xs text-secondary-text max-w-xs leading-relaxed mb-6">
          {description}
        </p>

        <Button variant="danger" size="medium" onClick={onClose} className="w-full text-xs font-bold">
          {actionLabel}
        </Button>
      </div>
    </BaseModal>
  );
};

// 6. IMAGE PREVIEW MODAL
export interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt?: string;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt = "Image preview",
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-4">
      <div className="flex flex-col gap-3">
        {/* Header Title */}
        <div className="flex items-center gap-2 border-b border-border-color pb-3 select-none">
          <Image className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold text-dark-text">{imageAlt}</span>
        </div>

        {/* Large Image Frame */}
        <div className="relative rounded-lg border border-border-color bg-slate-50 overflow-hidden max-h-[70vh] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-2">
          <Button variant="outline" size="small" onClick={onClose} className="text-xs font-semibold">
            Close Preview
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
