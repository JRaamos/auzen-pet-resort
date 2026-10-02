import type { AnchorHTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { useLinkClickHandler } from 'react-router-dom'

export type ButtonVariant = 'primary' | 'light' | 'outline' | 'text'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: ButtonVariant
}

const StyledLink = styled.a<{ $variant: ButtonVariant }>`
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.8rem 1.35rem;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.86rem;
  font-weight: 700;
  letter-spacing: 0.015em;
  line-height: 1.2;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.base},
    color ${({ theme }) => theme.transitions.base},
    background ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};

  &:hover {
    transform: translateY(-2px);
  }

  ${({ $variant, theme }) => {
    if ($variant === 'primary') {
      return css`
        color: ${theme.colors.white};
        background: ${theme.colors.terracotta};

        &:hover {
          background: ${theme.colors.terracottaDark};
        }
      `
    }

    if ($variant === 'light') {
      return css`
        color: ${theme.colors.forest};
        background: ${theme.colors.warmWhite};

        &:hover {
          background: ${theme.colors.sand};
        }
      `
    }

    if ($variant === 'outline') {
      return css`
        color: ${theme.colors.warmWhite};
        border-color: ${theme.colors.lightLine};
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(8px);

        &:hover {
          border-color: rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.12);
        }
      `
    }

    return css`
      min-height: auto;
      padding: 0.35rem 0;
      color: ${theme.colors.terracotta};
      border-radius: 0;
      border-bottom-color: currentColor;

      &:hover {
        color: ${theme.colors.terracottaDark};
      }
    `
  }}
`

export function ButtonLink({
  children,
  variant = 'primary',
  ...props
}: ButtonLinkProps) {
  const navigate = useLinkClickHandler<HTMLAnchorElement>(props.href || '/', {
    target: props.target,
  })
  return (
    <StyledLink
      $variant={variant}
      {...props}
      onClick={(event) => {
        props.onClick?.(event)
        if (props.href?.startsWith('/') && !event.defaultPrevented)
          navigate(event)
      }}
    >
      {children}
    </StyledLink>
  )
}
